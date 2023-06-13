"use client";
import axios from "axios";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useState, ChangeEvent } from "react";

import Heading from "../components/Heading";

import SmallInput from "../components/Inputs/SmallInput";
import toast, { Toaster } from "react-hot-toast";
import Wrapper from "@/app/components/Wrapper";
import DepartmentSelect from "@/app/components/Select/DepartmentSelect";
import Select from "@/app/components/Select";
import MyEditor from "@/app/components/Editor";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Textbox from "./Textbox";

interface NewPeopleProps {
  department: DepartmentProps[];
}

const NewPeople: React.FC<NewPeopleProps> = ({ department }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState("");
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
      salutation: "Dr.",
      firstName: "",
      lastName: "",
      slug: "",
      email: "",
      phone: "",
      qualification: "",
      address: "",
      opdTiming: "",
      opdDays: "",

      showEmail: "YES",
      showPhone: "YES",
      departmentId: "",
      designation: "",
      bio: "",
      order: 0,
      profileUrl: "",

      status: "ACTIVE",
    },
  });

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
      const res = await fetch("/api/peopleUpload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("something went wrong, check your console.");
        return;
      }

      const data: { fileUrl: string } = await res.json();

      setImageUrl(data.fileUrl);
      setValue("profileUrl", data.fileUrl);
    } catch (error) {
      console.error("something went wrong, check your console.");
    }

    /** Reset file input */
    e.target.type = "text";
    e.target.type = "file";
  };

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const profileUrl = watch("profileUrl");

  const generateSlug = () => {
    // Generate slug from username
    const slug = (
      firstName.toLowerCase() +
      "_" +
      lastName.toLowerCase()
    ).replace(/\s+/g, "_");
    // Set the generated slug to the slug field in the form
    setValue("slug", slug as string);
  };

  const handleEditorChange = (value: string) => {
    setValue("bio", value);
    console.log(value);
  };

  const editorContent = watch("bio");

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);

    axios
      .post("/api/people", data)
      .then(() => {
        toast.success("People created successfully");
        router.push("/people");
      })
      .catch((error) => {
        toast.error("Error creating People");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <>
      <div className="flex flex-col gap-4">
        <Heading title="Doctor" subtitle="Add a new Doctor" />
        <SmallInput
          id="salutation"
          label="Saluatation"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          isNumber={false}
        />
        <SmallInput
          id="firstName"
          label="First Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          isNumber={false}
        />
        <SmallInput
          id="lastName"
          label="Last Name"
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
        <div className="flex items-center justify-center space-x-3">
          <SmallInput
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            isNumber={false}
          />

          <div className="flex items-center w-full h-auto mt-6 space-x-3 ">
            <h1 className="text-neutral-500">Show Email</h1>

            <div className="flex items-center space-x-2">
              <input
                type="radio"
                value="YES"
                id="yes"
                {...register("showEmail")}
                defaultChecked
              />
              <label htmlFor="yes">Yes</label>

              <input
                type="radio"
                value="NO"
                {...register("showEmail")}
                id="no"
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-3">
          <SmallInput
            id="phone"
            label="Phone"
            disabled={isLoading}
            register={register}
            errors={errors}
            isNumber={false}
          />

          <div className="flex items-center w-full h-auto mt-6 space-x-3 ">
            <h1 className="text-neutral-500">Show Phone</h1>

            <div className="flex items-center space-x-2">
              <input
                type="radio"
                value="YES"
                id="yesp"
                {...register("showPhone")}
                defaultChecked
              />
              <label htmlFor="yesp">Yes</label>

              <input
                type="radio"
                value="NO"
                {...register("showPhone")}
                id="nop"
              />
              <label htmlFor="nop">No</label>
            </div>
          </div>
        </div>

        <SmallInput
          id="address"
          label="Address"
          disabled={isLoading}
          register={register}
          errors={errors}
          isNumber={false}
        />

        <SmallInput
          id="qualification"
          label="Qualification"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          isNumber={false}
        />

        <SmallInput
          id="designation"
          label="Designation"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          isNumber={false}
        />

        <div className="flex flex-col">
          <h1 className="mb-2 text-neutral-600">
            Department <span className="text-rose-500">*</span>
          </h1>
          <DepartmentSelect
            id="departmentId"
            register={register}
            errors={errors}
            departments={department}
            label="Department"
          />
        </div>

        <Textbox
          id="opdTiming"
          label="OPD Timing"
          disabled={isLoading}
          register={register}
          errors={errors}
          placeholder="eg 9:25 A.M , 9:35 A.M. "
        />

        <Textbox
          id="opdDays"
          label="OPD Days"
          disabled={isLoading}
          register={register}
          errors={errors}
          placeholder="MON , TUE"
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

        <SmallInput
          id="order"
          label="Order"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          isNumber
        />

        {/* <div className="flex flex-col w-56 h-auto gap-2">
          <h1 className="text-neutral-500">Profile Image</h1>
          <ImageUpload
            onChange={(value) => setValue("profileUrl", value)}
            value={profileUrl}
          />
        </div> */}

        <div className="w-full h-auto">
          <h1>Profile</h1>
          {imageUrl ? (
            <div className="relative w-52 h-52">
              <Image
                src={imageUrl}
                alt="uploaded image"
                fill
                style={{ objectFit: "fill" }}
                className="rounded-md"
                priority={true}
              />
            </div>
          ) : (
            <div className="w-52 h-52">
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

        <div className="flex flex-col w-full h-96">
          <h1 className="mb-2 text-neutral-500">Bio</h1>
          <MyEditor
            onChange={handleEditorChange}
            content={editorContent}
            className="h-96"
          />
        </div>
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

export default NewPeople;
