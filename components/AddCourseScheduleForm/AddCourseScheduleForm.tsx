"use client";
import {
  CourseScheduleState,
  submitCourseSchedule,
} from "@/controllers/actions/addCourseScheduleAction";
import { useParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DayButton from "../DayButton/DayButton";

export default function AddCourseScheduleForm() {
  const { id } = useParams();
  const [isRecurring, setIsRecurring] = useState(true);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const initialState: CourseScheduleState = {
    success: false,
    error: "",
    message: "",
    scheduleId: undefined,
  };

  const [formState, formAction, isPending] = useActionState(
    submitCourseSchedule,
    initialState
  );

  useEffect(() => {
    if (formState.error) {
      toast.error(formState.message);
    } else if (formState.success) {
      toast.success(
        formState.message || "Course Schedules Added successfully!"
      );
    }
  }, [formState]);

  const handleRecurringChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsRecurring(e.target.value === "true");
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const SelectedDaysInputs = () => (
    <>
      {selectedDays.map((day) => (
        <input key={day} type="hidden" name="daysOfWeek" value={day} data-testid={`day-input-${day}`} />
      ))}
    </>
  );

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="w-full mx-auto mt-4 mb-10" data-testid="schedule-form-container">
      <ToastContainer position="top-right" autoClose={3000} data-testid="toast-container" />
      <div className="bg-white rounded shadow-md overflow-hidden p-5 border-1 border-gray-300" data-testid="form-wrapper">
        <h1 className="text-xl font-semibold text-[#FFA41F] py-3" data-testid="form-title">
          Schedule Course
        </h1>
        <form action={formAction} className="space-y-4" data-testid="schedule-form">
          <input type="hidden" name="courseId" value={Number(id)} data-testid="course-id-input" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="startWeek"
                className="block text-sm font-medium text-gray-700"
                data-testid="start-week-label"
              >
                Starting Week
              </label>
              <input
                type="number"
                id="startWeek"
                name="startWeek"
                min="1"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                data-testid="start-week-input"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
                data-testid="duration-label"
              >
                Duration (weeks)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                min="1"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                data-testid="duration-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" data-testid="days-label">
              Days of Week
            </label>
            <div className="flex flex-wrap gap-2" data-testid="days-container">
              {days.map((day) => (
                <DayButton
                  key={day}
                  day={day}
                  selected={selectedDays.includes(day)}
                  onClick={toggleDay}
                  data-testid={`day-button-${day}`}
                />
              ))}
            </div>
            <SelectedDaysInputs />
            {selectedDays.length > 0 ? (
              <p className="text-sm text-gray-600 mt-2" data-testid="selected-days-text">
                Selected: {selectedDays.join(", ")}
              </p>
            ) : (
              <p className="text-sm text-gray-400 mt-2" data-testid="no-day-selected-text">
                Please select at least one day
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700"
                data-testid="start-time-label"
              >
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                data-testid="start-time-input"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-700"
                data-testid="end-time-label"
              >
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                data-testid="end-time-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="isRecurring"
              className="block text-sm font-medium text-gray-700"
              data-testid="recurring-label"
            >
              Recurring Event
            </label>
            <select
              id="isRecurring"
              name="isRecurring"
              required
              onChange={handleRecurringChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              data-testid="recurring-select"
            >
              <option value="true" data-testid="recurring-yes">Yes</option>
              <option value="false" data-testid="recurring-no">No</option>
            </select>
          </div>

          {!isRecurring && (
            <div className="space-y-2">
              <label
                htmlFor="specificDate"
                className="block text-sm font-medium text-gray-700"
                data-testid="specific-date-label"
              >
                Specific Date
              </label>
              <input
                type="date"
                id="specificDate"
                name="specificDate"
                required={!isRecurring}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                data-testid="specific-date-input"
              />
            </div>
          )}

          <div className="flex justify-center pt-4" data-testid="submit-button-container">
            <button
              type="submit"
              disabled={isPending || selectedDays.length === 0}
              className={`w-full py-2 border-none rounded-md shadow-sm text-lg text-white ${
                selectedDays.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#FFA41F] hover:bg-[#ffb11f] cursor-pointer"
              }`}
              data-testid="submit-button"
            >
              {isPending ? "Creating Schedules..." : "Create Schedules"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
