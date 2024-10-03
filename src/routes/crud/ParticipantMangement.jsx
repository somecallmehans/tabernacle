import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetParticipantsQuery } from "../../api/apiSlice";
import { EditButtons } from "./CrudComponents.jsx";
import { TextInput } from "../../components/FormInputs.jsx";
import LoadingSpinner from "../../components/LoadingSpinner";
import StandardButton from "../../components/Button";

import { usePostUpsertParticipantMutation } from "../../api/apiSlice";
const ParticipantRow = ({
  id,
  name,
  postUpsertParticipant,
  placeholder = "",
}) => {
  const [editing, setEditing] = useState();
  const { control, register, handleSubmit } = useForm();

  const handleEdit = async (formData) => {
    const { participantName } = formData;
    await postUpsertParticipant({ id: id, name: participantName }).unwrap();
    setEditing(false);
  };

  // This will do for now but there needs to be a prompty to prevent accidental deletions
  const handleDelete = async () => {
    await postUpsertParticipant({
      id: id,
      name: name,
      deleted: true,
    }).unwrap();
  };

  return (
    <form
      onSubmit={handleSubmit(handleEdit)}
      className="flex justify-between mb-2 px-4 text-lg border-b border-slate-400"
    >
      <TextInput
        name="participantName"
        defaultValue={name}
        placeholder={placeholder}
        control={control}
        classes={`bg-transparent data-[focus]:outline-none ${
          editing ? "text-sky-600" : ""
        }`}
        disabled={!editing}
        register={{ ...register("participantName") }}
      />
      <EditButtons
        editing={editing}
        setEditing={setEditing}
        editAction={handleEdit}
        deleteAction={handleDelete}
      />
    </form>
  );
};

export default function Page() {
  const [showCreate, setShowCreate] = useState();
  const { data: participants, isLoading: participantsLoading } =
    useGetParticipantsQuery();

  const [postUpsertParticipant] = usePostUpsertParticipantMutation();

  if (participantsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4">
      <div className="mb-2">
        <StandardButton
          title={showCreate ? "Cancel Create" : "Create New"}
          action={() => setShowCreate(!showCreate)}
        />
      </div>
      {showCreate && (
        <ParticipantRow
          name=""
          postUpsertParticipant={postUpsertParticipant}
          placeholder="Add Participant Name"
        />
      )}
      {participants.map(({ id, name }) => (
        <ParticipantRow
          key={id}
          id={id}
          name={name}
          postUpsertParticipant={postUpsertParticipant}
        />
      ))}
    </div>
  );
}
