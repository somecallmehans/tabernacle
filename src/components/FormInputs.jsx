import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";

import Select from "react-select";
import { Checkbox, Input } from "@headlessui/react";

export const Selector = ({ name, options, isMulti, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          isMulti={isMulti}
          name={name}
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        />
      )}
    />
  );
};

export const CheckBoxInput = forwardRef(({ name, checked, onChange }, ref) => {
  return (
    <Checkbox
      name={name}
      checked={checked}
      onChange={onChange}
      ref={ref}
      className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
    >
      <svg
        className="stroke-white opacity-0 group-data-[checked]:opacity-100"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M3 8L6 11L11 3.5"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Checkbox>
  );
});

export const TextInput = ({ name, type, placeholder = "", classes }) => {
  return (
    <Input
      placeholder={placeholder}
      className={`${classes} border data-[hover]:shadow data-[focus]:bg-blue-100`}
      name={name}
      type={type}
    />
  );
};
