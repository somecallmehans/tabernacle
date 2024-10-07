import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useGetAchievementsQuery,
  useGetAllSessionsQuery,
  useGetAchievementsForSessionQuery,
  usePostUpsertEarnedMutation,
  useGetSessionByDateQuery,
} from "../../api/apiSlice";

import LoadingSpinner from "../../components/LoadingSpinner";
import { Selector } from "../../components/FormInputs";
import { EditButtons, SimpleSelect, HelpfulWrapper } from "./CrudComponents";
import { formatDateString } from "../../helpers/dateHelpers";

const DisplayCol = ({ title, value }) => (
  <div className="flex flex-col items-center">
    <span className="text-xs">{title}</span>
    <span>{value || "--"}</span>
  </div>
);

const EditAchievement = ({
  id = "",
  participantId,
  roundId,
  name = "",
  point_value,
  allAchievements,
  earned_id = "",
  postUpsertEarned,
  round,
  openEdit,
  formName,
  sessionId,
  parent,
  parentMap,
  setToggleCreate,
}) => {
  const [editing, setEditing] = useState(openEdit);
  const { control, register, handleSubmit } = useForm();

  const displayPoints = parentMap[parent?.id]?.point_value || point_value;

  const handleCreate = async (formData) => {
    const {
      participantAchievement: { id: achievementId },
    } = formData;
    await postUpsertEarned({
      round: roundId,
      achievement: achievementId,
      session: sessionId,
      participant: participantId,
    }).unwrap();
    setToggleCreate(false);
  };

  const handleOnChangeEdit = async (data) => {
    const { id: achievementId } = data;
    await postUpsertEarned({
      earned_id: earned_id,
      achievement: achievementId,
    }).unwrap();
  };

  const handleOnChangeDelete = async () => {
    await postUpsertEarned({
      earned_id: earned_id,
      deleted: true,
    }).unwrap();
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreate)}
      name={formName}
      className="px-4 py-2 flex gap-4 justify-between items-center mb-2 text-lg border-b border-slate-300"
    >
      <Selector
        name="participantAchievement"
        control={control}
        defaultValue={{ name: name, id: id }}
        options={allAchievements.data}
        classes="basis-2/3"
        onChange={openEdit ? undefined : handleOnChangeEdit}
        disabled={!editing}
        register={{ ...register("participantAchievement") }}
      />
      <DisplayCol title="Round Earned" value={round?.round_number} />
      <DisplayCol title="Points" value={displayPoints} />

      <EditButtons
        formName={formName}
        editing={editing}
        setEditing={setEditing}
        deleteAction={handleOnChangeDelete}
      />
    </form>
  );
};

const EarnedRow = ({
  participantId,
  roundId,
  name,
  totalPoints,
  achievements,
  allAchievements,
  postUpsertEarned,
  sessionId,
}) => {
  const [toggle, showToggle] = useState();
  const [toggleCreate, setToggleCreate] = useState();

  const parentMap = allAchievements.data
    .filter(({ parent }) => !parent)
    .reduce((acc, curr) => ({ ...acc, [curr.id]: curr }));

  return (
    <React.Fragment>
      <div className="flex justify-between mb-2 px-4 text-lg border-b border-slate-400">
        <div className="flex basis-1/2 justify-between">
          <div>{name}</div> <div>{totalPoints} Points</div>
        </div>

        <div>
          {achievements.length > 0 && (
            <i
              className={` mr-4 fa fa-caret-${toggle ? "down" : "left"}`}
              onClick={() => showToggle(!toggle)}
            />
          )}
          <i
            className={`fa fa-${toggleCreate ? "x" : "plus"}`}
            onClick={() => setToggleCreate(!toggleCreate)}
          />
        </div>
      </div>
      {toggleCreate && (
        <EditAchievement
          roundId={roundId}
          allAchievements={allAchievements}
          postUpsertEarned={postUpsertEarned}
          openEdit
          formName="createAchievement"
          participantId={participantId}
          sessionId={sessionId}
          parentMap={parentMap}
          setToggleCreate={setToggleCreate}
        />
      )}
      {toggle &&
        achievements.map((achievement) => (
          <EditAchievement
            {...achievement}
            key={achievement?.id}
            allAchievements={allAchievements}
            postUpsertEarned={postUpsertEarned}
            formName="editAchievement"
            parentMap={parentMap}
          />
        ))}
    </React.Fragment>
  );
};

export default function Page() {
  const [selectMonth, setSelectMonth] = useState(undefined);
  const [selectSession, setSelectSession] = useState(undefined);
  const [skip, setSkip] = useState(true);

  const { data: earnedData, isLoading: earnedLoading } =
    useGetAchievementsForSessionQuery(selectSession, { skip });
  const { data: allAchievements, isLoading: achievementsLoading } =
    useGetAchievementsQuery();
  const { data: allSessions, isLoading: sessionsLoading } =
    useGetAllSessionsQuery();
  const { data: currentSession, isLoading: currentSessionLoading } =
    useGetSessionByDateQuery(selectMonth, { skip: !selectMonth });

  const [postUpsertEarned] = usePostUpsertEarnedMutation();

  if (
    earnedLoading ||
    achievementsLoading ||
    sessionsLoading ||
    currentSessionLoading
  ) {
    return <LoadingSpinner />;
  }

  const MM_YY = Object.keys(allSessions)?.map((x) => ({ label: x, value: x }));
  const sessionsMap =
    selectMonth &&
    allSessions[selectMonth]?.map(({ id, created_at }) => ({
      label: formatDateString(created_at),
      value: id,
    }));

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-2">
        <SimpleSelect
          placeholder="Select Month"
          options={MM_YY}
          classes="basis-1/4"
          onChange={(obj) => setSelectMonth(obj.value)}
          defaultValue={{ label: selectMonth, value: selectMonth }}
        />
        <SimpleSelect
          placeholder="Select Session"
          options={sessionsMap}
          onChange={(obj) => {
            setSelectSession(obj.value);
            setSkip(false);
          }}
          classes="basis-1/4"
          defaultValue={{ label: selectSession, value: selectSession }}
        />
      </div>
      <HelpfulWrapper
        hasData={!!earnedData?.length}
        message="This session doesn't have any information associated with it, please pick another one."
      >
        {earnedData?.map(({ id, name, total_points, achievements }) => (
          <div key={id} className="px-16">
            <EarnedRow
              participantId={id}
              sessionId={selectSession}
              roundId={currentSession?.rounds[0]?.id}
              name={name}
              totalPoints={total_points}
              achievements={achievements}
              allAchievements={allAchievements}
              postUpsertEarned={postUpsertEarned}
            />
          </div>
        ))}
      </HelpfulWrapper>
    </div>
  );
}
