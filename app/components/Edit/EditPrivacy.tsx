"use client";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import Heading from "@/app/components/Heading";
import SmallInput from "@/app/components/Inputs/SmallInput";
import Wrapper from "@/app/components/Wrapper";
import Select from "@/app/components/Select";
import MyEditor from "@/app/components/Editor";

interface EditPrivacyProps {
  privacy: any;
}

const EditPrivacy: React.FC<EditPrivacyProps> = ({ privacy }) => {
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
      title: privacy.title,
      status: privacy.status,
      slug: privacy.slug,
      content: privacy.content,
    },
  });

  const handleEditorChange = (value: string) => {
    setValue("content", value as string);
  };

  const editorContent = watch("content");

  const title = watch("title");

  const generateSlug = () => {
    const slug = title.toLowerCase().replace(/\s+/g, "_");

    setValue("slug", slug as string);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);

    axios
      .put(`/api/privacy/${privacy.id}`, data)
      .then(() => {
        toast.success("Privacy Policies Updated successfully");
      })
      .catch((error) => {
        toast.error("Failed to update Privacy Policies ");
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/privacy");
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Privacy Policy" subtitle="Edit Privacy Policy" />
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
          label="Link"
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
          Generate Link
        </button>
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

      <div className="flex flex-col w-full h-96">
        <h1 className="mb-5 text-neutral-500">Page Content</h1>
        <MyEditor
          onChange={handleEditorChange}
          content={editorContent}
          className="h-96"
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

export default EditPrivacy;
