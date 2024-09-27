import React, { useState } from "react";

import { useGetAchievementsQuery } from "../../api/apiSlice";

import LoadingSpinner from "../../components/LoadingSpinner";

const Achievement = ({ name, children, restrictions }) => {
  const [toggle, setToggle] = useState();

  return (
    <div>
      <div className="text-lg">
        {name}{" "}
        {restrictions.length > 0 && (
          <i
            className={`fa-solid fa-caret-${toggle ? "down" : "right"}`}
            onClick={() => setToggle(!toggle)}
          />
        )}
      </div>
      {toggle &&
        restrictions.map(({ id, name }) => (
          <div key={id} className="ml-3 text-md">
            <i className="fa-solid fa-minus mr-2" />
            {name}
          </div>
        ))}
      {children.length > 0 &&
        children.map(({ id, name }) => (
          <div key={id} className="ml-3 italic">
            {name}
          </div>
        ))}
    </div>
  );
};

export default function Achievements() {
  const { data, isLoading } = useGetAchievementsQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {Object.keys(data).map((x) => (
        <div key={x} className="border-2 border-t-black p-2">
          <div className="font-bold text-2xl">{x} Points</div>
          {data[x].map(({ id, name, children, restrictions }) => (
            <Achievement
              key={id}
              name={name}
              children={children}
              restrictions={restrictions}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
