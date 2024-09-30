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
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>1. Did anyone bring a snack</div>
      <Selector name="snack" control={control} options={focusedPod} isMulti />
      <div>2. Did anyone borrow a deck (3pts to deck owner)</div>
      <Selector
        name="loanedDeck"
        control={control}
        options={roundParticipantList}
        isMulti
      />
      <div>
        3. Did any players who did not win the game knock out other players
      </div>
      <Selector
        name="knockOuts"
        control={control}
        options={focusedPod}
        isMulti
      />
      <div>4. Who won</div>
      <Selector name="winner" control={control} options={focusedPod} />
      <div>5. Who was their commander + color_id</div>
      <div className="flex gap-1">
        <TextInput classes="basis-9/12" />
        <Selector name="color_id" control={control} options={[]} isMulti />
      </div>
      <div className="flex">
        6. Were they last in turn order:{" "}
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
        7. Did they win via:
        <div className="flex">
          <Controller
            name="commanderDamage"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <CheckBoxInput {...field} checked={field.value} />
            )}
          />
          <Controller
            name="winTheGameEffect"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <CheckBoxInput {...field} checked={field.value} />
            )}
          />
          <Controller
            name="zeroOrLessLife"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <CheckBoxInput {...field} checked={field.value} />
            )}
          />
          <Controller
            name="loseTheGameEffect"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <CheckBoxInput {...field} checked={field.value} />
            )}
          />
        </div>
      </div>
      <div>8. Other deck building achievements</div>
      <Selector
        control={control}
        name="winnerDeckbuildingAchievements"
        options={data.data}
        isMulti
      />
      <div className="mt-4">
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
                  className="text-lg font-medium leading-6 text-gray-900"
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
