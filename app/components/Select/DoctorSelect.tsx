"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

const DoctorSelect: React.FC<SelectProps> = ({
  id,

  register,
  required,

  doctors,
  label,
}) => {
  return (
    <div className="w-full h-auto ">
      <select
        {...register(id, { required })}
        className="border-2 rounded-md border-neutral-300 focus:outline-none focus:ring-0 focus:border-neutral-600"
      >
        <option value="">-- Select {label} --</option>
        {doctors?.map((doctor: any) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.firstName} {doctor.lastName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DoctorSelect;
