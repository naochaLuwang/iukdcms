"use client";

import axios from "axios";
import Wrapper from "@/app/components/Wrapper";
import Heading from "@/app/components/Heading";
import { useState, ChangeEvent } from "react";
import SmallInput from "@/app/components/Inputs/SmallInput";
import Image from "next/image";

import toast, { Toaster } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import Select from "@/app/components/Select";

const NewCarousalPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const router = useRouter();

  const onImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      console.warn("no file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("something went wrong, check your console.");
        return;
      }

      const data: { fileUrl: string } = await res.json();

      setImageUrl(data.fileUrl);
      setValue("imgUrl", data.fileUrl);
    } catch (error) {
      console.error("something went wrong, check your console.");
    }

    /** Reset file input */
    e.target.type = "text";
    e.target.type = "file";
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      imgUrl: "",
      order: 0,
      status: "ACTIVE",
    },
  });

  const imgUrl = watch("imgUrl");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (datas) => {
    setIsLoading(true);

    console.log(datas);

    axios
      .post("/api/carousalimage", datas)
      .then(() => {
        toast.success("Image Uploaded successfully");
      })
      .catch((error) => {
        toast.error("Error ");
      })
      .finally(() => {
        setIsLoading(false);
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

      {/* <div className="flex flex-col w-full h-auto gap-2">
        <h1 className="text-neutral-500">Carousal Image</h1>
        <ImageUpload
          onChange={(value: any) => setValue("imgUrl", value)}
          value={imgUrl}
        />
      </div> */}
      <div className="w-full h-auto">
        {imageUrl ? (
          <div className="relative w-full h-96">
            <Image
              src={imageUrl}
              alt="uploaded image"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
              priority={true}
            />
          </div>
        ) : (
          <div className="w-full h-96">
            <label
              htmlFor="imgUrl"
              className="inset-0 flex items-center justify-center w-full h-full transition duration-300 bg-gray-300 bg-opacity-25 rounded-md cursor-pointer hover:bg-opacity-50 focus-within:bg-opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8 h-8 text-gray-600"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2C5.03 2 1 6.03 1 10c0 3.97 3.03 8 9 8 3.97 0 8-3.03 8-8 0-4.97-4.03-8-8-8zM5 11h4v4h2v-4h4V9h-4V5H9v4H5v2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2 text-gray-600">Upload Image</span>
            </label>
            <input
              id="imgUrl"
              className="absolute w-0 h-0 opacity-0"
              type="file"
              {...register("imgUrl", {
                required: true,
              })}
              onChange={onImageFileChange}
            />
          </div>
        )}
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

export default NewCarousalPage;
