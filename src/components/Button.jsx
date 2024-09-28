import React from "react";

import { Button } from "@headlessui/react";

export default function StandardButton({ title, action }) {
  return (
    <Button
      onClick={action}
      className="px-4 py-2 min-w-24 self-end mr-2 rounded bg-sky-600 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
    >
      {title}
    </Button>
  );
}
