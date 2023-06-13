"use client";
import axios from "axios";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useState } from "react";

import Heading from "../components/Heading";

import SmallInput from "../components/Inputs/SmallInput";
import toast, { Toaster } from "react-hot-toast";
import Wrapper from "@/app/components/Wrapper";
import DepartmentSelect from "@/app/components/Select/DepartmentSelect";
import Select from "@/app/components/Select";
import MyEditor from "@/app/components/Editor";
import { useRouter } from "next/navigation";
import ImageUpload from "./Inputs/ImageUpload";
import DesignationSelect from "./Select/DesignationSelect";
import Textbox from "./Textbox";

const NewTestimonial = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      name: "",
      sub: "",
      testimony: "",
      imageUrl: "",
      status: "",
      order: 0,
    },
  });

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const imageUrl = watch("imageUrl");

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);

    axios
      .post("/api/testimonial", data)
      .then(() => {
        toast.success("Testimonial created successfully");
        router.push("/testimonial");
      })
      .catch((error) => {
        toast.error("Error creating Testimonial");
      })
      .finally(() => {
        setIsLoading(false);
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
        actionLabel="Submit"
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default NewTestimonial;
