import React from "react";

import LoadingSpinner from "../../components/LoadingSpinner";

import { useGetAllSessionsQuery } from "../../api/apiSlice";
import formatDateString from "../../helpers/dateHelpers";

export default function LeagueSession() {
  const { data, isLoading } = useGetAllSessionsQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  console.log(data);
  return Object.keys(data).map((month_year) => {
    const sessions = data[month_year];
    return (
      <div key={month_year}>
        <h1>{month_year}</h1>
        {sessions.map(({ id, created_at, rounds }) => (
          <div>
            {id} - {formatDateString(created_at)}
            {rounds.map(({ round_number }) => (
              <span className="ml-16">{round_number}</span>
            ))}
          </div>
        ))}
      </div>
    );
  });
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
}
