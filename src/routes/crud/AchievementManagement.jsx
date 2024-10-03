import React, { useState } from "react";
import { useGetAchievementsQuery } from "../../api/apiSlice";
import { useForm } from "react-hook-form";

import StandardButton from "../../components/Button";
import { TextInput } from "../../components/FormInputs";
import { EditButtons } from "./CrudComponents";
import LoadingSpinner from "../../components/LoadingSpinner";

const AchievementRow = ({ id, name, point_value, classes }) => {
  const [editing, setEditing] = useState();
  const { control, register, handleSubmit } = useForm();

  const handleEdit = (formData) => {
    console.log(formData);
    setEditing(false);
  };

  const handleDelete = () => {
    console.log("HANDLING DELETE");
  };

  return (
    <form
      className={`${classes} flex gap-2 justify-between mb-2 px-2 text-lg border-b border-slate-400`}
    >
      <TextInput
        name="achievementName"
        type="text"
        control={control}
        register={{ ...register("achievementName") }}
        defaultValue={name}
        classes={`text-sm grow bg-transparent data-[focus]:outline-none ${
          editing ? "text-sky-600" : ""
        }`}
      />
      <TextInput
        name="achievementPointValue"
        type="number"
        control={control}
        register={{ ...register("achievementPointValue") }}
        defaultValue={point_value}
        classes={`max-w-10 bg-transparent data-[focus]:outline-none ${
          editing ? "text-sky-600" : ""
        }`}
      />
      <EditButtons
        editing={editing}
        setEditing={setEditing}
        editAction={handleEdit}
        handleDelete={handleDelete}
      />
    </form>
  );
};

export default function Page() {
  const [showCreate, setShowCreate] = useState();
  const { data: achievements, isLoading: achievementsLoading } =
    useGetAchievementsQuery();

  if (achievementsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4">
      <div className="mb-2">
        <StandardButton
          title={showCreate ? "Cancel Create" : "Create New"}
          action={() => setShowCreate(!showCreate)}
        />
        {showCreate && <AchievementRow />}
        {Object.keys(achievements?.map).map((x) => {
          const achievementsData = achievements?.map[x];
          return achievementsData.map(({ name, children, point_value }) => (
            <React.Fragment>
              <AchievementRow name={name} point_value={point_value} />
              {children.length > 0 &&
                children.map(
                  ({ name: childName, point_value: childPointValue }) => (
                    <AchievementRow
                      name={childName}
                      point_value={childPointValue}
                      classes="ml-4"
                    />
                  )
                )}
            </React.Fragment>
          ));
        })}
      </div>
    </div>
  );
}
