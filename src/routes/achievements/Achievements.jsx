import React from "react";
import { useGetAchievementsQuery } from "../../api/apiSlice";

export default function Achievements() {
  const { data, isLoading } = useGetAchievementsQuery();

  if (isLoading) {
    return <h1>LOADING!</h1>;
  }

  return (
    <div>
      {data.map((d) => (
        <div>{d.name}</div>
      ))}
    </div>
  );
}
