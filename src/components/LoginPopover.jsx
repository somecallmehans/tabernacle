import React from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
  Field,
  Input,
  Label,
  Button,
} from "@headlessui/react";

export default function LoginPopover() {
  return (
    <Popover className="relative">
      <PopoverButton className="self-end mr-2 rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
        Login
      </PopoverButton>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <PopoverPanel
          anchor="bottom end"
          className="mt-2 divide-black/5 rounded-xl bg-black/50 text-sm/6"
        >
          <form>
            <div className="p-3">
              <Field className="py-2 px-3">
                <Label className="block text-white">Username</Label>
                <Input name="username" type="text" />
              </Field>

              <Field className="py-2 px-3">
                <Label className="block text-white">Password</Label>
                <Input name="password" type="password" />
              </Field>
              <div className="flex justify-center">
                <Button className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
