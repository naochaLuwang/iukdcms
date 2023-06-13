"use client";
import axios from "axios";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useState } from "react";

import Heading from "@/app/components/Heading";

import SmallInput from "@/app/components/Inputs/SmallInput";
import toast, { Toaster } from "react-hot-toast";
import Wrapper from "@/app/components/Wrapper";
import Select from "@/app/components/Select";
import MyEditor from "@/app/components/Editor";
import { useRouter } from "next/navigation";

const NewSubsubLinks = ({ sublinks }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      slug: "",
      order: 0,
      sublinkId: "",
      status: "ACTIVE",
      pageType: "dynamic",
      content: "",
    },
  });

  const title = watch("title");
  const pageType = watch("pageType");
  const generateSlug = () => {
    // Generate slug from username
    const slug = title.toLowerCase().replace(/\s+/g, "_");
    // Set the generated slug to the slug field in the form
    setValue("slug", slug);
  };

  const handleEditorChange = (value: any) => {
    setValue("content", value);
    console.log(value);
  };

  const editorContent = watch("content");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);

    axios
      .post("/api/subsublinks", data)
      .then(() => {
        toast.success("Sub sublink created successfully");
      })
      .catch((error) => {
        toast.error("Error ");
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/subsublink");
      });
  };

  const bodyContent = (
    <>
      <div className="flex flex-col gap-4">
        <Heading title="Sub Sublink" subtitle="Add a new Sub Sublink" />
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
            className="w-48 h-10 py-2 text-blue-500 border border-blue-800 rounded-md"
            onClick={generateSlug}
          >
            Generate slug
          </button>
        </div>
        <div className="flex flex-col">
          <h1 className="mb-2 text-neutral-600">
            Sub Link <span className="text-rose-500">*</span>
          </h1>
          <Select
            id="sublinkId"
            register={register}
            errors={errors}
            menus={sublinks}
            label="sublinks"
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
              defaultChecked
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

        <SmallInput
          id="order"
          label="Order"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          isNumber
        />

        {pageType === "dynamic" && (
          <div className="flex flex-col w-full h-96">
            <h1>Page Content</h1>
            <MyEditor
              onChange={handleEditorChange}
              content={editorContent}
              className="h-96"
            />
          </div>
        )}
      </div>
    </>
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

export default NewSubsubLinks;
