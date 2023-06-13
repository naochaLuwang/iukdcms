"use client";

import React, { useState } from "react";

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface DayTimeSlots {
  dayOfWeek: string;
  morning: TimeSlot;
  evening: TimeSlot;
  isDayOff: boolean;
}

interface DoctorFormProps {
  onSubmit: (timeSlots: DayTimeSlots[]) => void;
}

const AvailabiltyForm: React.FC<DoctorFormProps> = ({ onSubmit }) => {
  const [timeSlots, setTimeSlots] = useState<DayTimeSlots[]>([
    {
      dayOfWeek: "",
      morning: { startTime: "", endTime: "" },
      evening: { startTime: "", endTime: "" },
      isDayOff: false,
    },
  ]);

  const handleAddTimeSlot = () => {
    setTimeSlots([
      ...timeSlots,
      {
        dayOfWeek: "",
        morning: { startTime: "", endTime: "" },
        evening: { startTime: "", endTime: "" },
        isDayOff: false,
      },
    ]);
  };

  const handleRemoveTimeSlot = (index: number) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots.splice(index, 1);
    setTimeSlots(updatedTimeSlots);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    shift: "morning" | "evening",
    timeType: "start" | "end"
  ) => {
    const { name, value } = e.target;

    const updatedTimeSlots = [...timeSlots];
    const updatedTimeSlot = { ...updatedTimeSlots[index] };

    if (shift === "morning") {
      updatedTimeSlot.morning = {
        ...updatedTimeSlot.morning,
        [timeType]: value,
      };
    } else {
      updatedTimeSlot.evening = {
        ...updatedTimeSlot.evening,
        [timeType]: value,
      };
    }

    updatedTimeSlots[index] = updatedTimeSlot;
    setTimeSlots(updatedTimeSlots);
  };

  const handleDayOffChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { checked } = e.target;

    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index].isDayOff = checked;

    setTimeSlots(updatedTimeSlots);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(timeSlots);
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      {timeSlots.map((slot, index) => (
        <div key={index} className="p-4 mb-4 border rounded">
          <div className="flex items-center mb-2">
            <label className="mr-2">Day of Week:</label>
            <input
              type="text"
              name={`dayOfWeek-${index}`}
              value={slot.dayOfWeek}
              onChange={(e) =>
                setTimeSlots((prev) => {
                  const updatedTimeSlots = [...prev];
                  updatedTimeSlots[index].dayOfWeek = e.target.value;
                  return updatedTimeSlots;
                })
              }
              required
              className="px-2 py-1 border rounded"
            />
          </div>
          <div className="flex mb-2">
            <div className="mr-4">
              <label>Morning:</label>
              <div>
                <input
                  type="time"
                  name={`morningStart-${index}`}
                  value={slot.morning.startTime}
                  onChange={(e) =>
                    handleInputChange(e, index, "morning", "start")
                  }
                  required
                  className="px-2 py-1 border rounded"
                />
                <input
                  type="time"
                  name={`morningEnd-${index}`}
                  value={slot.morning.endTime}
                  onChange={(e) =>
                    handleInputChange(e, index, "morning", "end")
                  }
                  required
                  className="px-2 py-1 mt-2 border rounded"
                />
              </div>
            </div>
            <div>
              <label>Evening:</label>
              <div>
                <input
                  type="time"
                  name={`eveningStart-${index}`}
                  value={slot.evening.startTime}
                  onChange={(e) =>
                    handleInputChange(e, index, "evening", "start")
                  }
                  required
                  className="px-2 py-1 border rounded"
                />
                <input
                  type="time"
                  name={`eveningEnd-${index}`}
                  value={slot.evening.endTime}
                  onChange={(e) =>
                    handleInputChange(e, index, "evening", "end")
                  }
                  required
                  className="px-2 py-1 mt-2 border rounded"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <label className="mr-2">Day off:</label>
            <input
              type="checkbox"
              name={`dayOff-${index}`}
              checked={slot.isDayOff}
              onChange={(e) => handleDayOffChange(e, index)}
              className="w-5 h-5 form-checkbox"
            />
          </div>
          <button
            type="button"
            onClick={() => handleRemoveTimeSlot(index)}
            className="px-2 py-1 mt-2 text-white bg-red-500 rounded"
          >
            Remove Time Slot
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddTimeSlot}
        className="px-2 py-1 text-white bg-green-500 rounded"
      >
        Add Time Slot
      </button>
      <button
        type="submit"
        className="px-2 py-1 mt-4 text-white bg-blue-500 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default AvailabiltyForm;
