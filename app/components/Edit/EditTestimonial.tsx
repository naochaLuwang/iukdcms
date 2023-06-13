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
import ImageUpload from "../Inputs/ImageUpload";

import Textbox from "../Textbox";

interface EditTestimonialProps {
  testimonial: TestimonialProps;
}

const EditTestimonial: React.FC<EditTestimonialProps> = ({ testimonial }) => {
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
      name: testimonial.name,
      sub: testimonial.sub,
      imageUrl: testimonial.imageUrl,
      status: testimonial.status,
      id: testimonial.id,

      testimony: testimonial.testimony,

      order: testimonial.order,
      createdAt: testimonial.createdAt,
      updatedAt: testimonial.updatedAt,
    },
  });

  const handleEditorChange = (value: string) => {
    setValue("bio", value);
  };

  const editorContent = watch("bio");

  const imageUrl = watch("imageUrl");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .put(`/api/testimonial/${testimonial.id}`, data)
      .then(() => {
        toast.success("Testimonial Updated successfully");
      })
      .catch((error) => {
        toast.error("Failed to update Testimonial ");
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/testimonial");
      });
  };

  const bodyContent = (
    <>
      <div className="flex flex-col gap-4">
        <Heading title="Testimonial" subtitle="Add a new Testimonial" />
        <SmallInput
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          isNumber={false}
        />
        <SmallInput
          id="sub"
          label="Subtitle"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          isNumber={false}
        />

        <div className="flex flex-col w-56 h-auto gap-2">
          <h1 className="text-neutral-500">Profile Image</h1>
          <ImageUpload
            onChange={(value) => setValue("imageUrl", value)}
            value={imageUrl}
          />
        </div>

        <div className="flex flex-col w-full h-auto">
          <Textbox
            label="Testimonial"
            id="testimony"
            register={register}
            errors={errors}
            required
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

        <SmallInput
          id="order"
          label="Order"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          isNumber
        />
      </div>
    </>
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

export default EditTestimonial;
