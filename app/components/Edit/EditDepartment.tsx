"use client";
import axios from "axios";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useState } from "react";
import Heading from "@/app/components/Heading";
import SmallInput from "@/app/components/Inputs/SmallInput";
import toast, { Toaster } from "react-hot-toast";
import Wrapper from "@/app/components/Wrapper";

import { useRouter } from "next/navigation";
import Select from "../Select";

interface EditDepartmentProps {
  department: DepartmentProps;
}

const EditDepartment: React.FC<EditDepartmentProps> = ({ department }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      departmentName: department?.departmentName,
      departmentCode: department?.departmentCode,
      order: department?.order,
      status: department?.status,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);

    axios
      .put(`/api/department/${department.id}`, data)
      .then(() => {
        toast.success("Department Updated successfully");
      })
      .catch((error) => {
        toast.error("Failed to update Department ");
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/department");
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Department" subtitle="Edit department" />
      <SmallInput
        id="departmentName"
        label="Department Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        isNumber={false}
      />

      <SmallInput
        id="departmentCode"
        label="Department Code"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        isNumber={false}
      />

      <SmallInput
        id="order"
        label="Display Order"
        disabled={isLoading}
        register={register}
        errors={errors}
        isNumber={true}
      />

      <div className="flex flex-col">
        <h1 className="mb-2 text-neutral-600">
          Status <span className="text-rose-500">*</span>
        </h1>
        <Select
          id="status"
          register={register}
          errors={errors}
          label="status"
          menus={[
            { id: "ACTIVE", title: "ACTIVE" },
            { id: "INACTIVE", title: "INACTIVE" },
          ]}
        />
      </div>
    </div>
  );

  return (
    <>
      <Wrapper
        disabled={isLoading}
        title=""
        actionLabel="Update"
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default EditDepartment;
