"use client";

import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Wrapper from "@/app/components/Wrapper";
import Heading from "@/app/components/Heading";
import SmallInput from "@/app/components/Inputs/SmallInput";
import ImageUpload from "@/app/components/Inputs/ImageUpload";
import Select from "@/app/components/Select";

const CreateAlbumPage = () => {
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
      title: "",
      thumbnailImage: "",

      order: 0,
      status: "ACTIVE",
    },
  });

  const thumbnailImage = watch("thumbnailImage");

  const onSubmit: SubmitHandler<FieldValues> = (datas) => {
    setIsLoading(true);

    axios
      .post("/api/album", datas)
      .then(() => {
        toast.success("Image Uploaded successfully");
      })
      .catch((error) => {
        toast.error("Error ");
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/album");
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Album" />

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
        <h1 className="text-neutral-500">Thumbnail Image</h1>
        <ImageUpload
          onChange={(value: any) => setValue("thumbnailImage", value)}
          value={thumbnailImage}
        />
      </div>
    </div>
  );
  return (
    <>
      <Wrapper
        actionLabel={"Submit"}
        body={bodyContent}
        disabled={isLoading}
        onSubmit={handleSubmit(onSubmit)}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default CreateAlbumPage;
