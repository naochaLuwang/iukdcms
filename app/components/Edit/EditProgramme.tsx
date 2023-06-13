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

interface EditProgrammeProps {
  programme: ProgrammeProps;
}

const EditProgramme: React.FC<EditProgrammeProps> = ({ programme }) => {
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
      id: programme.id,
      slug: programme.slug,
      programmeName: programme.programmeName,
      programmeCode: programme.programmeCode,
      programmeType: programme.programmeType,
      programmeDuration: programme.programmeDuration,
      minQualification: programme.minQualification,
      order: programme.order,
    },
  });

  const programmeName = watch("programmeName");

  const generateSlug = () => {
    const slug = programmeName.toLowerCase().replace(/\s+/g, "_");

    setValue("slug", slug as string);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .put(`/api/programme/${programme.id}`, data)
      .then(() => {
        toast.success("Programme Updated successfully");
      })
      .catch((error) => {
        toast.error("Failed to update Programme ");
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/programme");
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Programme" subtitle="Add a new Programme" />
      <SmallInput
        id="programmeName"
        label="Programme Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        isNumber={false}
      />
      <SmallInput
        id="programmeCode"
        label="Programme Code"
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
          required
          isNumber={false}
        />

        <button
          className="w-48 h-10 py-2 text-white duration-200 ease-in-out transform bg-blue-500 border rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline active:bg-blue-800 translate-all"
          onClick={generateSlug}
        >
          Generate slug
        </button>
      </div>
      <div className="flex flex-col">
        <h1 className="mb-2 text-neutral-600">
          Programme Type <span className="text-rose-500">*</span>
        </h1>
        <Select
          id="programmeType"
          register={register}
          errors={errors}
          label="status"
          menus={[
            { id: "degree", title: "Degree" },
            { id: "diploma", title: "Diploma" },
          ]}
        />
      </div>
      <SmallInput
        id="programmeDuration"
        label="Programme duration"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        isNumber={false}
      />
      <SmallInput
        id="minQualification"
        label="Minimum Qualification"
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

export default EditProgramme;
