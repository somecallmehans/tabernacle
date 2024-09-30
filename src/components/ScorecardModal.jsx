import React, { Fragment } from "react";
import { useForm, Controller } from "react-hook-form";

import StandardButton from "./Button";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { TextInput, CheckBoxInput, Selector } from "./FormInputs";
import {
  useGetAchievementsQuery,
  usePostRoundScoresMutation,
} from "../api/apiSlice";

const ScorecardFormFields = ({
  focusedPod,
  roundParticipantList,
  sessionId,
  roundId,
  closeModal,
}) => {
  const [postRoundScores] = usePostRoundScoresMutation();
  const { control, handleSubmit } = useForm();
  const { data, isLoading } = useGetAchievementsQuery();

  if (isLoading) {
    return null;
  }

  const handleFormSubmit = async (formData) => {
    // each of these is a list of participants except for:
    // winner is a participant dict
    // winnerDeckbuildingAchievements is a list of achievements
    const {
      snack,
      loanedDeck,
      knockOuts,
      winner: { id: winnerId },
      lastInTurnOrder,
      commanderDamage,
      winTheGameEffect,
      zeroOrLessLife,
      loseTheGameEffect,
      winnerDeckbuildingAchievements,
    } = formData;

    const boolMap = [
      { condition: lastInTurnOrder, achievementId: 27 },
      { condition: commanderDamage, achievementId: 46 },
      { condition: winTheGameEffect, achievementId: 47 },
      { condition: zeroOrLessLife, achievementId: 41 },
      { condition: loseTheGameEffect, achievementId: 40 },
    ];

    const participantAchievementMap = {
      [winnerId]: { id: winnerId, achievements: [44] },
    };

    const addAchievements = (participants, achievementId) => {
      participants.forEach((p) => {
        if (!participantAchievementMap[p.id]) {
          participantAchievementMap[p.id] = {
            id: p.id,
            achievements: [achievementId],
          };
        } else {
          participantAchievementMap[p.id]["achievements"].push(achievementId);
        }
      });
    };

    addAchievements(snack, 25);
    addAchievements(loanedDeck, 26);
    addAchievements(knockOuts, 36);

    winnerDeckbuildingAchievements.forEach(({ id }) =>
      participantAchievementMap[winnerId]["achievements"].push(id)
    );

    winnerDeckbuildingAchievements.forEach(({ id }) => {
      participantAchievementMap[winnerId]["achievements"] = [
        ...participantAchievementMap[winnerId]["achievements"],
        id,
      ];
    });

    boolMap.forEach(({ condition, achievementId }) => {
      if (condition) {
        participantAchievementMap[winnerId]["achievements"].push(achievementId);
      }
    });

    const participantList = Object.keys(participantAchievementMap).map(
      (x) => participantAchievementMap[x]
    );

    const formattedData = {
      round: roundId,
      session: sessionId,
      pod: focusedPod.podId,
      participants: participantList,
    };

    try {
      await postRoundScores(formattedData).unwrap();
      closeModal();
    } catch (err) {
      console.error("Failed to post round scores: ", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4"
    >
      <Selector
        name="snack"
        control={control}
        options={focusedPod.participants}
        placeholder="Did Anyone Bring a Snack"
        isMulti
      />
      <Selector
        name="loanedDeck"
        control={control}
        options={roundParticipantList}
        placeholder="Did anyone lend a deck to the winner?"
        isMulti
      />
      <Selector
        name="knockOuts"
        control={control}
        options={focusedPod.participants}
        placeholder="Did anyone who did not win knock out other players?"
        isMulti
      />
      <Selector
        name="winner"
        placeholder="Winner"
        control={control}
        options={focusedPod.participants}
      />
      <div className="flex gap-1">
        <TextInput classes="basis-9/12" placeholder="Winner's Commander" />
        <Selector
          name="color_id"
          control={control}
          options={[]}
          placeholder="Color ID"
          isMulti
        />
      </div>
      <div className="flex gap-2">
        Were they last in turn order:{" "}
        <Controller
          name="lastInTurnOrder"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <CheckBoxInput {...field} checked={field.value} />
          )}
        />
      </div>
      <div>
        Did they win via:
        <div className="grid grid-cols-2 gap-2">
          <Controller
            name="commanderDamage"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <CheckBoxInput
                {...field}
                classes="flex items-center gap-2"
                label="Commander Damage"
                checked={field.value}
              />
            )}
          />
          <Controller
            name="winTheGameEffect"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <CheckBoxInput
                {...field}
                classes="flex items-center gap-2"
                label="Win The Game Effect"
                checked={field.value}
              />
            )}
          />
          <Controller
            name="zeroOrLessLife"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <CheckBoxInput
                {...field}
                label="Having Zero Or Less Life"
                classes="flex items-center gap-2"
                checked={field.value}
              />
            )}
          />
          <Controller
            name="loseTheGameEffect"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <CheckBoxInput
                {...field}
                classes="flex items-center gap-2"
                label="Lose The Game Effect"
                checked={field.value}
              />
            )}
          />
        </div>
      </div>
      <Selector
        control={control}
        name="winnerDeckbuildingAchievements"
        options={data.data}
        placeholder="Other Deck Building Achievements"
        isMulti
      />
      <div className="mt-2">
        <StandardButton title="Submit" type="submit" />
      </div>
    </form>
  );
};

export default function ScorecardModal({
  isOpen,
  closeModal,
  focusedPod,
  roundParticipantList,
  sessionId,
  roundId,
}) {
  if (!focusedPod) {
    return null;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-4/5 items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="mb-2 text-xl font-medium leading-6 text-gray-900"
                >
                  Submit Score Card
                </DialogTitle>
                <ScorecardFormFields
                  focusedPod={focusedPod}
                  roundParticipantList={roundParticipantList}
                  roundId={roundId}
                  sessionId={sessionId}
                  closeModal={closeModal}
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
