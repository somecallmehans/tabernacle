import React from "react";

import LoadingSpinner from "../../components/LoadingSpinner";
import StandardButton from "../../components/Button";
import { useGetAllSessionsQuery } from "../../api/apiSlice";
import { formatDateString, formatMonthYear } from "../../helpers/dateHelpers";
import PageTitle from "../../components/PageTitle";

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
          {formatMonthYear(month_year)}
        </div>
        {sessions.map(({ id, created_at, rounds }) => (
          <div
            className="border border-transparent border-b-slate-300 grid grid-cols-4 gap-4 mb-4 py-2 items-center"
            key={id}
          >
            {formatDateString(created_at)}
            {rounds.map(({ id, round_number }) => (
              <div key={id} className="justify-self-end">
                <StandardButton
                  title={`Round ${round_number}`}
                  action={() => console.log("ROUND")}
                />
              </div>
            ))}
            <div className="justify-self-end">
              <i class="fa-solid fa-x mr-4" />
            </div>
          </div>
        ))}
      </div>
    );
  });
}

export default function LeagueManagementPage() {
  return (
    <div className="p-4">
      <PageTitle title="League Session Management" />
      <div className="mb-4">
        <StandardButton
          title="Start New"
          action={() => console.log("NEW ROUND")}
        />
      </div>
      <LeagueSession />
    </div>
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
