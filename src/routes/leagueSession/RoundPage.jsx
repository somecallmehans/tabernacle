import React from "react";
import { Link, useLocation } from "react-router-dom";

import PageTitle from "../../components/PageTitle";
import StandardButton from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useGetParticipantsQuery } from "../../api/apiSlice";

function RoundLobby() {
  const { data, isLoading } = useGetParticipantsQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return <div>{data.map((x) => x.name)}</div>;
}

// If a round is open but there are no pods, go to the lobby
// If a round is open but we have pods, go to the FocusedView
// If a round is closed, show the FocusedView but disable everything

function FocusedRound({ completed }) {
  if (completed) {
    return <div>This is a historic round thanks for visiting</div>;
  }

  return <div>This is an active round thanks for visiting</div>;
}

export default function RoundPage() {
  const location = useLocation();
  // temp until the api is ready
  const pods = [];
  const { roundNumber, date, sessionId, roundId, completed } = location.state;
  return (
    <div className="bg-white p-4 mb-4">
      <PageTitle title={`Round ${roundNumber} for ${date}`} />
      <Link to={"/league-session"}>
        <StandardButton title="Back" />
      </Link>
      {pods.length === 0 ? (
        <RoundLobby />
      ) : (
        <FocusedRound
          sessionId={sessionId}
          roundId={roundId}
          completed={completed}
          pods={pods}
        />
      )}
    </div>
  );
}
