"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface SelectProps {
  id: string;

  title?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  menus: any;
  label?: string;
}

const Select: React.FC<SelectProps> = ({
  id,

  register,
  required,
  errors,
  menus,
  label,
}) => {
  return (
    <div className="w-full h-auto ">
      <select
        {...register(id, { required })}
        className="border-2 rounded-md border-neutral-300 focus:outline-none focus:ring-0 focus:border-neutral-600"
      >
        <option value="">-- Select {label} --</option>
        {menus.map((menu: any) => (
          <option key={menu.title} value={menu.id}>
            {menu.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
