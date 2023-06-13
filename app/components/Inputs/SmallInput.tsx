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
  isNumber?: boolean | undefined;
}

const SmallInput: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
  small,
  isNumber,
}) => {
  return (
    <div className="relative flex flex-col w-full">
      <div className="flex items-center space-x-2">
        <label
          className={` text-md  z-10 mb-2 ${
            formatPrice ? "left-9" : "left-4"
          } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
            errors[id] ? "text-rose-500" : "text-neutral-500"
          }`}
        >
          {label}
        </label>
        {required && <h1 className="text-lg text-rose-500">*</h1>}
      </div>

      <input
        id={id}
        disabled={disabled}
        {...register(id, { required, valueAsNumber: isNumber })}
        placeholder=" "
        type={type}
        className={`peer flex-1 p-2  font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          formatPrice ? "pl-9" : "pl-4"
        } ${errors[id] ? "border-rose-500" : "border-neutral-300"} ${
          errors[id] ? "focus:border-rose-500" : "focus:border-neutral-500"
        }  ${small ? "w-[40rem]" : "w-full"}`}
      />
    </div>
  );
};

export default SmallInput;
