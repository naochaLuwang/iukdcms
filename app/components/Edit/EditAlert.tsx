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

interface EditAlertProps {
  alert: AlertProps;
}

const EditAlert: React.FC<EditAlertProps> = ({ alert }) => {
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
      title: alert.title,
      status: alert.status,
      slug: alert.slug,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);

    axios
      .put(`/api/alert/${alert.id}`, data)
      .then(() => {
        toast.success("Notification Updated successfully");
      })
      .catch((error) => {
        toast.error("Failed to update Notification ");
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/alerts");
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Alerts" subtitle="Add a new Alert" />
      <SmallInput
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        isNumber={false}
      />
      <div className="flex items-end gap-4">
        <SmallInput
          id="slug"
          label="Slug"
          disabled={isLoading}
          register={register}
          errors={errors}
          isNumber={false}
        />
      </div>

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

export default EditAlert;
