import React, { useState } from "react";
import {
  useGetAchievementsQuery,
  usePostUpsertAchievementsMutation,
} from "../../api/apiSlice";
import { useForm } from "react-hook-form";

import StandardButton from "../../components/Button";
import { TextInput } from "../../components/FormInputs";
import { EditButtons } from "./CrudComponents";
import LoadingSpinner from "../../components/LoadingSpinner";

const formName = "achievementForm";

const AchievementRow = ({
  id,
  name,
  point_value,
  classes,
  placeholder = "",
  postUpsertAchievements,
  createCancel,
  parent_id,
}) => {
  console.log(parent_id);
  const [editing, setEditing] = useState();
  const { control, register, handleSubmit } = useForm();

  const handleEdit = async (formData) => {
    const { achievementName, achievementPointValue } = formData;
    await postUpsertAchievements({
      id: id,
      name: achievementName || name,
      point_value: achievementPointValue || point_value,
      parent_id: parent_id,
    }).unwrap();
    setEditing(false);
  };

  const handleDelete = () => {
    console.log("HANDLING DELETE");
  };

  return (
    <form
      onSubmit={handleSubmit(handleEdit)}
      name={formName}
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
        placeholder={placeholder}
        disabled={!editing}
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
        disabled={!editing}
      />
      {/* Trigger a popover that has selector in it to choose a new parent
       would use the same update endpoint just with a different parent */}
      {parent_id && <button>Change Parent</button>}
      <EditButtons
        editing={editing}
        setEditing={setEditing}
        deleteAction={handleDelete}
        formName={formName}
      />
      {/* Plus icon to add children? */}
    </form>
  );
};

export default function Page() {
  const [showCreate, setShowCreate] = useState();
  const { data: achievements, isLoading: achievementsLoading } =
    useGetAchievementsQuery();

  const [postUpsertAchievements] = usePostUpsertAchievementsMutation();

  if (achievementsLoading) {
    return <LoadingSpinner />;
  }

  console.log(achievements);
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
              <AchievementRow
                postUpsertAchievements={postUpsertAchievements}
                name={name}
                point_value={point_value}
              />
              {children.length > 0 &&
                children.map(
                  ({
                    name: childName,
                    point_value: childPointValue,
                    parent: { id: parent_id },
                  }) => (
                    <AchievementRow
                      name={childName}
                      point_value={childPointValue}
                      classes="ml-4"
                      postUpsertAchievements={postUpsertAchievements}
                      parent_id={parent_id}
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
