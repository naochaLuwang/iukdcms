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

interface EditCounterProps {
  counter: any;
}

const EditCounter: React.FC<EditCounterProps> = ({ counter }) => {
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
      title: counter.title,
      value: counter.value,
      status: counter.status,
      order: counter.order,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);

    axios
      .put(`/api/counter/${counter.id}`, data)
      .then(() => {
        toast.success("Counter Updated successfully");
      })
      .catch((error) => {
        toast.error("Failed to update Counter ");
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/counter");
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Counter" subtitle="Add a new Counter" />
      <SmallInput
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        isNumber={false}
      />

      <SmallInput
        id="value"
        label="Value"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        isNumber={true}
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

export default EditCounter;
