"use client";
import useSWR from "swr";
import axios from "axios";
import Wrapper from "@/app/components/Wrapper";
import Heading from "@/app/components/Heading";
import { useState } from "react";
import SmallInput from "@/app/components/Inputs/SmallInput";
import Textbox from "@/app/components/Textbox";
import toast, { Toaster } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import ImageUpload from "../components/Inputs/ImageUpload";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res: Response) => res.json());
const OrganizationSettingPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data, error } = useSWR("/api/orgsetting", fetcher, {
    refreshInterval: 1000,
  });
  const router: AppRouterInstance = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      add1: "",
      add2: "",
      mtitle: "",
      description: "",
      facebook: "",
      linkedin: "",
      instagram: "",
      logoUrl: "",
    },
  });

  const logoUrl = watch("logoUrl");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  if (data?.length > 0) {
    setValue("name", data[0]?.name);
    setValue("phone", data[0]?.phone);
    setValue("email", data[0]?.email);
    setValue("add1", data[0]?.add1);
    setValue("add2", data[0]?.add2);
    setValue("mtitle", data[0]?.mtitle);
    setValue("description", data[0]?.description);
    setValue("facebook", data[0]?.facebook);
    setValue("linkedin", data[0]?.linkedin);
    setValue("instagram", data[0]?.instagram);
    // setValue("logoUrl", data[0]?.logoUrl);
  }

  const onSubmit: SubmitHandler<FieldValues> = (datas: FieldValues): void => {
    setIsLoading(true);

    if (data && data?.length > 0) {
      axios
        .put(`/api/orgsetting/${data[0].id}`, datas)
        .then(() => {
          toast.success("Updated successfully");
        })
        .catch((error) => {
          toast.error("Error ");
        })
        .finally(() => {
          setIsLoading(false);
          router.refresh();
        });
    } else {
      axios
        .post("/api/orgsetting", datas)
        .then(() => {
          toast.success("Organization setting created successfully");
        })
        .catch((error) => {
          toast.error("Error ");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const bodyContent: JSX.Element = (
    <div className="flex flex-col gap-4">
      <Heading title="Organization Setting" />

      <SmallInput
        id="name"
        label="Organization Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        isNumber={false}
      />
      <SmallInput
        id="phone"
        label="Organization Phone Number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        isNumber={false}
      />
      <SmallInput
        id="email"
        label="Organization Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        isNumber={false}
      />
      <SmallInput
        id="add1"
        label="Address Line 1"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        isNumber={false}
      />
      <SmallInput
        id="add2"
        label="Address Line 2"
        disabled={isLoading}
        register={register}
        errors={errors}
        isNumber={false}
      />
      <SmallInput
        id="mtitle"
        label="Title (For SEO Meta tag)"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        isNumber={false}
      />
      <Textbox
        id="description"
        label="Description (For SEO)"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div className="grid grid-cols-3 gap-4">
        <SmallInput
          id="facebook"
          label="Facebook"
          disabled={isLoading}
          register={register}
          errors={errors}
          isNumber={false}
        />

        <SmallInput
          id="linkedin"
          label="LinkedIn"
          disabled={isLoading}
          register={register}
          errors={errors}
          isNumber={false}
        />
        <SmallInput
          id="instagram"
          label="Instagram"
          disabled={isLoading}
          register={register}
          errors={errors}
          isNumber={false}
        />

        <div className="flex flex-col w-full h-auto gap-2">
          <h1 className="text-neutral-500">Organization Logo</h1>
          <ImageUpload
            onChange={(value: string) => setValue("logoUrl", value)}
            value={data?.length > 0 ? data[0].logoUrl : logoUrl}
          />
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Wrapper
        actionLabel={data?.length > 0 ? "Update" : "Submit"}
        body={bodyContent}
        disabled={isLoading}
        onSubmit={handleSubmit(onSubmit)}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default OrganizationSettingPage;
