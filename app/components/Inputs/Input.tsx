"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  small?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
  small,
}) => {
  return (
    <div className="relative flex flex-col w-full">
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`peer  p-4  font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          formatPrice ? "pl-9" : "pl-4"
        } ${errors[id] ? "border-rose-500" : "border-neutral-300"} ${
          errors[id] ? "focus:border-rose-500" : "focus:border-neutral-300"
        } ${small ? "pt-3" : "pt-6"} ${small ? "w-[40rem]" : "w-full"}`}
      />
      {!small && (
        <label
          className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
            formatPrice ? "left-9" : "left-4"
          } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
            errors[id] ? "text-rose-500" : "text-zinc-400"
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Input;
