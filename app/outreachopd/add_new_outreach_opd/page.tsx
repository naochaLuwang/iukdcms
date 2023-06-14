"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Control } from "react-hook-form";
import DoctorSelect from "../../components/Select/DoctorSelect";
import axios from "axios";
import { toast } from "react-hot-toast";

type OPDFormValues = {
  date: string;
  doctorId: string;
  opdlists: {
    clinicName: string;
    location: string;
    timing: string;
  }[];
};

const OPDForm: React.FC = () => {
  const { register, handleSubmit, control } = useForm<OPDFormValues>();
  const [doctors, setDoctors] = useState<any | null>();
  const { fields, append, remove } = useFieldArray<OPDFormValues>({
    control,
    name: "opdlists",
  });

  useEffect(() => {
    fetch(`/api/people`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      });
  }, []);

  const now = new Date();

  const currentDate = now.toISOString().split("T")[0];
  const onSubmit = (data: OPDFormValues) => {
    axios
      .post("/api/outreachopds", data)
      .then(() => {
        toast.success("Message sent successfully");
      })
      .catch((error) => {
        toast.error("Error sending message");
      })
      .finally(() => {});
  };

  return (
    <div className="w-full px-10 py-10 mx-auto max-w-7xl bg-gray-50">
      <h1 className="mb-10 text-3xl font-medium">Add Outreach OPDs</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <h1>Date</h1>
          <input
            type="date"
            id="date"
            className={`lg:w-96 w-full px-3 mt-2 py-2 border rounded-md focus:outline-none focus:ring-teal-700 $`}
            {...register("date", {
              required: true,
            })}
            min={currentDate}
            required
          />
        </div>

        <div className="w-full mt-4 mb-4">
          <h1 className="text-base text-neutral-700">Doctor</h1>
          <DoctorSelect
            id="doctor"
            register={register}
            label="Doctor"
            doctors={doctors}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-base text-neutral-700">
            OPD Timings:
          </label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex mb-2">
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                {...register(`opdlists.${index}.clinicName`, {
                  required: true,
                })}
                placeholder="Clinic Name"
              />

              <input
                className="w-full p-2 ml-2 border border-gray-300 rounded"
                type="text"
                {...register(`opdlists.${index}.location`, { required: true })}
                placeholder="Location"
              />

              <input
                className="w-full p-2 ml-2 border border-gray-300 rounded"
                type="text"
                {...register(`opdlists.${index}.timing`)}
                placeholder="Timing"
              />

              <button
                className="p-2 ml-2 text-white bg-red-500 rounded"
                type="button"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="p-2 text-white bg-blue-500 rounded"
            type="button"
            onClick={() =>
              append({
                clinicName: "",
                location: "",
                timing: "",
              })
            }
          >
            Add Timing
          </button>
        </div>

        <button
          className="w-full p-2 text-white bg-green-500 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default OPDForm;
