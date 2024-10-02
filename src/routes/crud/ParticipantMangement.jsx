import React, { useState } from "react";
import { useGetParticipantsQuery } from "../../api/apiSlice";
import { EditButtons } from "./CrudComponents.jsx";
import LoadingSpinner from "../../components/LoadingSpinner";

const ParticipantRow = ({ name }) => {
  const [editing, setEditing] = useState();

  const handleEdit = (data) => {
    console.log(data);
    setEditing(false);
  };

  const handleDelete = (data) => {
    console.log("handling delete");
  };

  return (
    <div className="flex justify-between mb-2 px-4 text-lg border-b border-slate-400">
      <div>{name}</div>
      <EditButtons
        editing={editing}
        setEditing={setEditing}
        editAction={handleEdit}
        deleteAction={handleDelete}
      />
    </div>
  );
};

export default function Page() {
  const { data: participants, isLoading: participantsLoading } =
    useGetParticipantsQuery();

  if (participantsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4">
      {participants.map(({ name }) => (
        <ParticipantRow name={name} />
      ))}
    </div>
  );
}
