import React from "react";
import { Route, Routes, Link } from "react-router-dom";

import RoundPage from "./RoundPage";
import LoadingSpinner from "../../components/LoadingSpinner";
import StandardButton from "../../components/Button";
import {
  useGetAllSessionsQuery,
  usePostCreateSessionMutation,
} from "../../api/apiSlice";
import { formatDateString, formatMonthYear } from "../../helpers/dateHelpers";
import PageTitle from "../../components/PageTitle";

const disableRoundButtons = (
  roundNumber,
  sessionClosed,
  completed,
  otherRoundStatus
) => {
  // if a session is closed then no buttons should be disabled
  if (sessionClosed) {
    return false;
  }

  // if round 2 is not finished and the other round is also not finished disable round 2
  if (roundNumber === 2 && !completed && !otherRoundStatus) {
    return true;
  }

  // if round 1 is finished disable that button
  if (roundNumber === 1 && completed) {
    return true;
  }

  return false;
};

const Round = ({
  id,
  sessionId,
  roundNumber,
  created_at,
  completed,
  sessionClosed,
  otherRoundStatus,
}) => {
  const disableButton = disableRoundButtons(
    roundNumber,
    sessionClosed,
    completed,
    otherRoundStatus
  );

  function roundText() {
    if (completed) {
      return "View ";
    }
    if (roundNumber === 2 && !completed && !otherRoundStatus) {
      return "Begin ";
    }
    return "Continue ";
  }
  return (
    <div className="justify-self-end">
      <Link
        to={`${id}`}
        state={{
          roundId: id,
          completed: completed,
          sessionId: sessionId,
          roundNumber: roundNumber,
          date: created_at,
        }}
      >
        <StandardButton
          disabled={disableButton}
          title={`${roundText()}Round ${roundNumber}`}
        />
      </Link>
    </div>
  );
};

function LeagueSession() {
  const { data, isLoading } = useGetAllSessionsQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return Object.keys(data).map((month_year) => {
    const sessions = data[month_year];
    return (
      <div className="bg-white p-4 mb-4" key={month_year}>
        <div className="text-2xl mb-2 underline">
          {formatMonthYear(month_year)} Season
        </div>
        {sessions.map(({ id, created_at, rounds, closed }) => (
          <div
            className="border border-transparent border-b-slate-300 grid grid-cols-4 gap-4 mb-4 py-2 items-center"
            key={id}
          >
            {formatDateString(created_at)}
            {/* Sessions will always have 2 rounds, no more no less. */}
            <Round
              sessionId={id}
              id={rounds[0].id}
              roundNumber={rounds[0].round_number}
              completed={rounds[0].completed}
              created_at={formatDateString(created_at)}
              sessionClosed={closed}
              otherRoundStatus={rounds[1].completed}
            />
            <Round
              sessionId={id}
              id={rounds[1].id}
              roundNumber={rounds[1].round_number}
              completed={rounds[1].completed}
              created_at={formatDateString(created_at)}
              sessionClosed={closed}
              otherRoundStatus={rounds[0].completed}
            />
            <div className="justify-self-end">
              <i className="fa-solid fa-trash-can mr-4" />
            </div>
          </div>
        ))}
      </div>
    );
  });
}

function LeagueManagementPage() {
  const [postCreateSession] = usePostCreateSessionMutation();

  const handleCreateSession = async () => {
    try {
      await postCreateSession().unwrap();
    } catch (err) {
      console.error("Failed to create new league session: ", err);
    }
  };

  return (
    <div className="p-4">
      <PageTitle title="League Session Management" />
      <div className="mb-4">
        <StandardButton
          title="Start New"
          action={() => handleCreateSession()}
        />
      </div>
      <LeagueSession />
    </div>
  );
}

export default function LeagueRouter() {
  return (
    <Routes>
      <Route path="/" element={<LeagueManagementPage />} />
      <Route path="/:round_id" element={<RoundPage />} />
    </Routes>
  );
}

// return (
//   <React.Fragment>
//     <h1>
//       Maybe make this page with a table sorted from most to least recent of
//       sessions. Clicking a plus button begins a session, the row propagates
//       with a round 1 and round 2 button. Old rows are historic (session.closed
//       is true), clicking into those reveals info about the old
//       sessions/rounds. This should be done with a request to the backend that sends the mm_yy +
//     </h1>
//     <h1>
//       The new row (session.closed is false) will be fully editable and send
//       requests for the appropriate round info This page should make a request
//       to a new endpoint and fetch all sessions.
//     </h1>

//   </React.Fragment>
// );
