import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import {
  useGetParticipantsQuery,
  useGetPodsQuery,
  usePostBeginRoundMutation,
} from "../../api/apiSlice";

import PageTitle from "../../components/PageTitle";
import StandardButton from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import CreatableSelect from "react-select/creatable";
import ScorecardModal from "../../components/ScorecardModal";

function RoundLobby({ roundId, sessionId }) {
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [postBeginRound] = usePostBeginRoundMutation();
  const { data, isLoading } = useGetParticipantsQuery();
  const { handleSubmit, control } = useForm();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const onSubmit = async () => {
    try {
      await postBeginRound({
        round: roundId,
        session: sessionId,
        participants: selectedParticipants,
      }).unwrap();
    } catch (err) {
      console.error("Failed to begin round: ", err);
    }
  };

  const addParticipant = (participant) => {
    if (
      participant &&
      !selectedParticipants.some((p) => p.name === participant?.name)
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
        <span>
          Checked In Players{" "}
          {selectedParticipants.length === 0 ? "" : selectedParticipants.length}
        </span>
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

function FocusedRound({ completed, pods, sessionId, roundId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedPod, setFocusedPod] = useState({});
  const roundParticipantList = Object.values(pods).flatMap((innerObject) =>
    Object.values(innerObject).flatMap((item) => item.participants)
  );

  console.log(pods);

  function closeModal() {
    setFocusedPod({});
    setIsOpen(false);
  }

  function openModal(pods, id) {
    setFocusedPod({
      participants: pods.map((p) => p.participants),
      podId: id,
    });
    setIsOpen(true);
  }

  if (completed) {
    return <div>This is a historic round thanks for visiting</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {Object.keys(pods).map((pod_id, index) => {
        const { pods: playerPods, submitted, id } = pods[pod_id];
        return (
          <div key={pod_id}>
            <div className="flex items-end justify-center content-center text-3xl mb-2">
              <div className="mr-4">Pod {index + 1}</div>
              {submitted ? (
                <i className="fa-regular fa-circle-check text-slate-600" />
              ) : (
                <i
                  className="fa-regular fa-circle-exclamation text-sky-600 hover:text-sky-500"
                  onClick={() => openModal(playerPods, id)}
                />
              )}
            </div>
            <div className="border border-blue-300 grid grid-cols-2 overflow-y-auto">
              {playerPods.map(
                ({ id, participants: { name, total_points } }, index) => (
                  <div
                    key={id}
                    className={`p-8 border border-blue-300 grid grid-cols-1 overflow-y-auto text-center ${
                      playerPods.length === 3 && index === 2 ? "col-span-2" : ""
                    }`}
                  >
                    <span className="text-xl">{name}</span>
                    <span className="text-sm">
                      {total_points} Points This Month
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        );
      })}
      <ScorecardModal
        isOpen={isOpen}
        closeModal={closeModal}
        focusedPod={focusedPod}
        roundParticipantList={roundParticipantList}
        sessionId={sessionId}
        roundId={roundId}
      />
    </div>
  );
}

export default function RoundPage() {
  const location = useLocation();
  const { roundNumber, date, sessionId, roundId, completed } = location.state;

  const { data, isLoading } = useGetPodsQuery(roundId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white p-4 mb-4 h-full">
      <PageTitle title={`Round ${roundNumber} for ${date}`} />
      <Link to={"/league-session"}>
        <StandardButton title="Back" />
      </Link>
      <div className="mt-4">
        {!completed && data && Object.keys(data).length === 0 ? (
          <RoundLobby sessionId={sessionId} roundId={roundId} />
        ) : (
          <FocusedRound
            sessionId={sessionId}
            roundId={roundId}
            completed={completed}
            pods={data}
          />
        )}
      </div>
    </div>
  );
}
