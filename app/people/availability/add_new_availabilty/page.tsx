"use client";
import React from "react";
import AvailabiltyForm from "../../../components/AvailabilityForm";

const AddAvailability = () => {
  const handleSubmit = (timeSlots: any) => {
    // Handle form submission and save the timeSlots to the MongoDB database
    console.log(timeSlots);
  };
  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Doctor Availability Form</h1>
      <AvailabiltyForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddAvailability;
