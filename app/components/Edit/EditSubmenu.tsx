"use client";
import axios from "axios";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useState } from "react";
import Heading from "@/app/components/Heading";
import SmallInput from "@/app/components/Inputs/SmallInput";
import toast, { Toaster } from "react-hot-toast";
import Wrapper from "@/app/components/Wrapper";
import MyEditor from "@/app/components/Editor";

import { useRouter } from "next/navigation";
import Select from "../Select";

const EditSubLink = ({ sublink, links }: any) => {
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
      title: sublink?.title,
      slug: sublink?.slug,
      order: sublink?.order,
      status: sublink?.status,
      content: sublink?.content,
      pageType: sublink?.pageType,
      linkId: sublink?.linkId,
    },
  });

  const handleEditorChange = (value: any) => {
    setValue("content", value);
    console.log(value);
  };

  const editorContent = watch("content");

  const title = watch("title");
  const pageType = watch("pageType");

  const generateSlug = () => {
    // Generate slug from username
    const slug = title.toLowerCase().replace(/\s+/g, "_");
    // Set the generated slug to the slug field in the form
    setValue("slug", slug);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .put(`/api/sublinks/${sublink.id}`, data)
      .then(() => {
        toast.success("Sublink Updated successfully");
      })
      .catch((error) => {
        toast.error("Failed to update Sublink ");
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/sublink");
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Edit Sub Link" />
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
          Link <span className="text-rose-500">*</span>
        </h1>
        <Select
          id="linkId"
          register={register}
          errors={errors}
          menus={links}
          label="Links"
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
      <div className="flex items-center w-full h-auto space-x-3 ">
        <h1 className="text-neutral-500">Page Type</h1>

        <div className="flex items-center space-x-2">
          <input
            type="radio"
            value="dynamic"
            id="dynamic"
            {...register("pageType")}
          />
          <label htmlFor="dynamic">Dynamic</label>

          <input
            type="radio"
            value="static"
            {...register("pageType")}
            id="static"
          />
          <label htmlFor="static">Static</label>
        </div>
      </div>

      {pageType === "dynamic" && (
        <div className="flex flex-col w-full h-96">
          <h1 className="mb-5 text-neutral-500">Page Content</h1>
          <MyEditor
            onChange={handleEditorChange}
            content={editorContent}
            className="h-96"
          />
        </div>
      )}
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

export default EditSubLink;
