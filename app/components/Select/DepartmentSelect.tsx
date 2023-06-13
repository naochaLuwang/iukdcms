"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

const DepartmentSelect: React.FC<SelectProps> = ({
  id,

  register,
  required,
  errors,
  departments,
  label,
}) => {
  return (
    <div className="w-full h-auto ">
      <select
        {...register(id, { required })}
        className="border-2 rounded-md border-neutral-300 focus:outline-none focus:ring-0 focus:border-neutral-600"
      >
        <option value="">-- Select {label} --</option>
        {departments.map((department: any) => (
          <option key={department.id} value={department.id}>
            {department.departmentName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DepartmentSelect;
