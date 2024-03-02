import React from "react";
import { ErrorMessage } from "formik";

const InputWrapper = ({
  type,
  name,
  label,
  value,
  handleOnChange,
  onBlur,
  error,
  touched
}) => {
  return (
    <>
      <div className="">
        <label htmlFor={name} className="text-base block pb-1 ">
          {label}
        </label>
        <input
          type={type}
          id={name}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          name={name}
          value={value}
          onChange={handleOnChange}
          onBlur={onBlur}
        />
        {error && touched && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </>
  );
};

export default InputWrapper;
