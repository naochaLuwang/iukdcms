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
import ImageUpload from "../Inputs/ImageUpload";

interface EditCarousalProps {
  carousalImage: carousalimageProps;
}

const EditCarousal: React.FC<EditCarousalProps> = ({ carousalImage }) => {
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
      title: carousalImage?.title,
      imgUrl: carousalImage?.imgUrl,
      order: carousalImage?.order,
      status: carousalImage?.status,
    },
  });

  const imgUrl = watch("imgUrl");

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);

    axios
      .put(`/api/carousalimage/${carousalImage.id}`, data)
      .then(() => {
        toast.success("Carousal Image Updated successfully");
      })
      .catch((error) => {
        toast.error("Failed to update Carousal Image ");
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/carousalimage");
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Carousal Image" />

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
        id="order"
        label="Order"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
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

      <div className="flex flex-col w-full h-auto gap-2">
        <h1 className="text-neutral-500">Carousal Image</h1>
        <ImageUpload
          onChange={(value: any) => setValue("imgUrl", value)}
          value={imgUrl}
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

export default EditCarousal;
