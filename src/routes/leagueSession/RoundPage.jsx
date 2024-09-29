import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { useGetParticipantsQuery } from "../../api/apiSlice";

import PageTitle from "../../components/PageTitle";
import StandardButton from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import CreatableSelect from "react-select/creatable";

function RoundLobby({ roundId, sessionId }) {
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const { data, isLoading } = useGetParticipantsQuery();
  const { handleSubmit, control } = useForm();
  const onSubmit = () => {
    console.log({
      round: roundId,
      sessionId: sessionId,
      participants: selectedParticipants,
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const addParticipant = (participant) => {
    console.log(participant);
    if (
      participant &&
      !selectedParticipants.some((p) => p.id === participant?.id)
    )
      setSelectedParticipants([...selectedParticipants, participant]);
  };

  const removeParticipant = (index) => {
    setSelectedParticipants(selectedParticipants.filter((_, i) => i !== index));
  };

  return (
    <div>
      <form
        className="flex w-full justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="participants"
          render={({ field }) => (
            <CreatableSelect
              className="grow mr-2"
              {...field}
              isClearable
              options={data}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => ({
                id: option.id,
                name: option.name,
              })}
              getNewOptionData={(option) => ({
                name: option,
                id: undefined,
              })}
              onChange={(selectedOption) => addParticipant(selectedOption)}
              onCreateOption={(inputValue) =>
                addParticipant({ name: inputValue, id: undefined })
              }
              isValidNewOption={(option) => option}
            />
          )}
        />
        <StandardButton type="submit" title="Submit" />
      </form>
      <div className="mt-4 text-2xl flex justify-center">
        <span>Checked In Players</span>
      </div>
      {selectedParticipants.length > 0 && (
        <div className="mt-2 w-1/2 mx-auto">
          {selectedParticipants.map((participant, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 items-center">
              <span className="text-xl">{participant.name}</span>
              <div className="justify-self-end">
                <i
                  className="fa-solid fa-trash-can mr-4"
                  onClick={() => removeParticipant(index)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
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
    <div className="bg-white p-4 mb-4 h-full">
      <PageTitle title={`Round ${roundNumber} for ${date}`} />
      <Link to={"/league-session"}>
        <StandardButton title="Back" />
      </Link>
      <div className="mt-4">
        {pods.length === 0 ? (
          <RoundLobby sessionId={sessionId} roundId={roundId} />
        ) : (
          <FocusedRound
            sessionId={sessionId}
            roundId={roundId}
            completed={completed}
            pods={pods}
          />
        )}
      </div>
    </div>
  );
}
