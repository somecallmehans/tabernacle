import React, { Fragment } from "react";
import StandardButton from "./Button";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

export default function ScorecardModal({ isOpen, closeModal, focusedPod }) {
  console.log(focusedPod);
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Here are the participants in this pod:
                  </p>
                  {focusedPod.map((x) => (
                    <div>{x.name}</div>
                  ))}
                </div>
                ----------------- Scorecard Form Fields:
                {/* 1 and 3 need to be a multi select */}
                {/* 2 needs to be a multi select w/ all round participants */}
                {/* 4 Needs to be a regular select */}
                {/* 5, 6, 7, 8, 9 are disabled until 4 is selected since the value in that field 
                is what all these fields will apply to */}
                {/* 6-8 can probably be check boxes? */}
                {/* 9 is a multi select similar to the participant selector which renders
                an extra selector if applicable (i.e. parent -> child) */}
                <div>1. Did anyone bring a snack</div>
                <div>2. Did anyone borrow a deck (3pts to deck owner)</div>
                <div>
                  3. Did any players who did not win the game knock out other
                  players
                </div>
                <div>4. Who won</div>
                <div>5. Who was their commander + color_id</div>
                <div>6. Were they last</div>
                <div>
                  7. Did they win via commander damage/win the game effect/or 0
                  less life
                </div>
                <div>8. Did they win via a lose the game effect</div>
                <div>9. Other deck building achievements</div>
                <div className="mt-4">
                  <StandardButton
                    title="Submit"
                    type="submit"
                    action={closeModal}
                  />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
