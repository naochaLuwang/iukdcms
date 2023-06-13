"use client";
import axios from "axios";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useState } from "react";
import Heading from "@/app/components/Heading";
import SmallInput from "@/app/components/Inputs/SmallInput";
import toast, { Toaster } from "react-hot-toast";
import Wrapper from "@/app/components/Wrapper";

import MultiUpload from "../Inputs/MultiUpload";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface ImageData {
  albulmId: any;
  imageUrl: any;
}

const EditAlbulm = ({ albulm }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageD, setImageD] = useState<ImageData[]>(albulm?.images);
  const [images, setImages] = useState<ImageData[]>([]);
  const router = useRouter();

  console.log(albulm);

  console.log(images);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {},
  });

  const handleUpload = (images: any) => {
    setIsLoading(true);

    axios
      .post(`/api/image`, images)
      .then(() => {
        toast.success("Albulm Saved successfully");
      })
      .catch((error) => {
        toast.error("Failed to update Menu ");
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/albulm");
      });
  };

  return (
    <div className="flex flex-col w-full max-h-screen px-10 py-10 overflow-y-scroll">
      <Heading title={albulm?.title} />

      <div className="flex flex-col w-full h-auto gap-2">
        <h1 className="text-neutral-500">Upload Images</h1>

        <div className="grid grid-cols-4 gap-6">
          <MultiUpload
            onChange={(value: any) =>
              setImages([...images, { albulmId: albulm?.id, imageUrl: value }])
            }
          />
          {imageD &&
            imageD.map((image) => (
              <div
                key={image.imageUrl}
                className="relative h-40 border border-gray-200 shadow-sm w-60"
              >
                <Image
                  src={image.imageUrl}
                  alt={image.albulmId}
                  fill
                  style={{ objectFit: "fill" }}
                />
              </div>
            ))}
          {images &&
            images.map((image) => (
              <div
                key={image.imageUrl}
                className="relative h-40 border border-gray-200 shadow-sm w-60"
              >
                <Image
                  src={image.imageUrl}
                  alt={image.albulmId}
                  fill
                  style={{ objectFit: "fill" }}
                />
              </div>
            ))}
        </div>

        <button
          className="w-full py-3 mt-5 text-lg font-medium text-white bg-green-600 rounded-lg disabled:bg-opacity-70 hover:bg-green-700 active:bg-green-800"
          onClick={() => handleUpload(images)}
          disabled={images.length == 0 ? true : false}
        >
          Save
        </button>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default EditAlbulm;
