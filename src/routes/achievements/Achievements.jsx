import React from "react";
import { useGetAchievementsQuery } from "../../api/apiSlice";

const sortAndNestAchievements = (achievements) => {
  const map = {};
  achievements.forEach((achievement) => {
    if (!achievement.parent_id) {
      map[achievement.id] = { ...achievement, children: [] };
    }
  });

  achievements.forEach((achievement) => {
    if (achievement.parent_id) {
      if (map[achievement.parent_id]) {
        map[achievement.parent_id].children.push(achievement);
      }
    }
  });

  const sortedAchievements = Object.values(map).sort(
    (a, b) => b.point_value - a.point_value
  );

  sortedAchievements.forEach((parent) => {
    parent.children.sort((a, b) => b.point_value - a.point_value);
  });

  return sortedAchievements;
};

export default function Achievements() {
  const { data, isLoading } = useGetAchievementsQuery();

  if (isLoading) {
    return <h1>LOADING!</h1>;
  }

  const displayAchievements = sortAndNestAchievements(data);

  return (
    <div>
      {displayAchievements.map((parent) => (
        <div key={parent.id}>
          <div>
            {parent.name} ({parent.point_value} points)
          </div>
          {parent.children.length > 0 &&
            parent.children.map((child) => (
              <div key={child.id} className="font-bold">
                {child.name} ({child.point_value} points)
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
