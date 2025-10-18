"use client";

import SelectCourse from "@/components/Dropdowns/SelectCourse";
import Loader from "@/components/Shared/Loader";
import { TimePicker } from "@/components/TimePicker/TimePicker";
import { saveAvailability } from "@/controllers/actions/availability";
import { getCoMonitorCoursesNames } from "@/services/courses";
import { useActionState, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Submit from "./Submit";
import { useAuth } from "@/context/user";

export default function CreateAppointmentPage() {
  const { user } = useAuth();
  const [coursesList, setCoursesList] = useState<
    | {
        courseId: number;
        courseName: string;
      }[]
    | null
  >();
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const [formState, formAction] = useActionState(saveAvailability, {
    success: false,
    message: "",
    errors: null,
  });

  const userId = user.userId!;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const courses = await getCoMonitorCoursesNames(userId);
      setCoursesList(courses);
    } catch {
      throw new Error("CODE:602");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (formState?.message) {
      if (formState.success) {
        toast.success(formState.message, { autoClose: 3000 });
      } else {
        toast.error(formState.message, { autoClose: 3000 });
      }
    }
    fetchData();
  }, [formState, fetchData]);

  if (loading) return <Loader message="Loading availability..." />;

  return (
    <section className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Add New Slot</h2>
      <form action={formAction} className="space-y-4">
        {coursesList && coursesList?.length > 0 && (
          <SelectCourse options={coursesList} appendSearchParams={false} />
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            name="date"
            required
            className="w-full p-2 border rounded-md"
          />
          <input type="hidden" name="coMonitorId" value={user.userId!} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Start Time</label>
            <TimePicker
              onChange={setStartTime}
              name="startTime"
              value={startTime}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">End Time</label>
            <TimePicker value={endTime} onChange={setEndTime} name="endTime" />
          </div>
        </div>

        <Submit label="Add Availability" />
      </form>
    </section>
  );
}
