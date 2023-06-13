"use client";

const DesignationSelect: React.FC<SelectProps> = ({
  id,

  register,
  required,
  errors,
  designations,

  label,
}) => {
  return (
    <div className="w-full h-auto ">
      <select
        {...register(id, { required })}
        className="border-2 rounded-md border-neutral-300 focus:outline-none focus:ring-0 focus:border-neutral-600"
      >
        <option value="">-- Select {label} --</option>
        {designations?.map((designation: DesignationProps) => (
          <option key={designation.id} value={designation.id}>
            {designation.designationName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DesignationSelect;
