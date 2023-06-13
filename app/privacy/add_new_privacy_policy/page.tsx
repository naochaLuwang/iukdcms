"use client";
import axios from "axios";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useState } from "react";
import Heading from "../../components/Heading";
import SmallInput from "../../components/Inputs/SmallInput";
import toast, { Toaster } from "react-hot-toast";
import Wrapper from "@/app/components/Wrapper";
import MyEditor from "@/app/components/Editor";
import { useRouter } from "next/navigation";
import Select from "@/app/components/Select";

const NewPrivacy = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      slug: "",

      status: "ACTIVE",
      content: "",
    },
  });

  const handleEditorChange = (value: string) => {
    setValue("content", value as string);
  };

  const editorContent = watch("content");

  const title = watch("title");
  const pageType = watch("pageType");

  const generateSlug = () => {
    const slug = title.toLowerCase().replace(/\s+/g, "_");

    setValue("slug", slug as string);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);

    axios
      .post("/api/privacy", data)
      .then(() => {
        toast.success("Privacy Policy created successfully");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/privacy");
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Privacy Policy" subtitle="Add a new Privacy Policy" />
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
        actionLabel="Submit"
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default NewPrivacy;
