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

interface EditDesignationProps {
  designation: DesignationProps;
}

const EditDesignation: React.FC<EditDesignationProps> = ({ designation }) => {
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
      designationName: designation?.designationName,
      designationCode: designation?.designationCode,

      status: designation?.status,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);

    axios
      .put(`/api/designation/${designation.id}`, data)
      .then(() => {
        toast.success("Designation Updated successfully");
      })
      .catch((error) => {
        toast.error("Failed to update Designation ");
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/designation");
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Designation" subtitle="Edit designation" />
      <SmallInput
        id="designationName"
        label="Designation Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        isNumber={false}
      />

      <SmallInput
        id="designationCode"
        label="Designation Code"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        isNumber={false}
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

export default EditDesignation;
