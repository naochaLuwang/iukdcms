"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;

  disabled?: boolean;

  required?: boolean;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Textbox: React.FC<InputProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  placeholder,
  errors,
}) => {
  return (
    <div className="relative flex flex-col w-full">
      <div className="flex items-center space-x-2">
        <label
          className={` text-md  z-10 mb-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
            errors[id] ? "text-rose-500" : "text-neutral-500"
          }`}
        >
          {label}
        </label>
        {required && <h1 className="text-lg text-rose-500">*</h1>}
      </div>

      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        className={`peer  p-2  font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed  ${
          errors[id] ? "border-rose-500" : "border-neutral-300"
        } ${
          errors[id] ? "focus:border-rose-500" : "focus:border-neutral-500"
        } `}
        rows={5}
      ></textarea>
    </div>
  );
};

export default Textbox;
