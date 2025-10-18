"use client";
import { useAuth } from "@/context/user";
import {
  submitAnnouncement,
  AnnouncementState,
} from "@/controllers/actions/sendAnnouncementAction";
import { Course } from "@/types";
import { useActionState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  courses:
    | Course[]
    | {
        courseId: number;
        courseName: string;
      }[];
}

export default function SendAnnouncementForm({ courses }: IProps) {
  const {user} = useAuth();
  const initialState: AnnouncementState = {
    success: false,
    error: "",
    message: "",
    announcementId: undefined,
  };
  const [formState, formAction, isPending] = useActionState(
    submitAnnouncement,
    initialState
  );

  useEffect(() => {
    if (formState.error) {
      toast.error(formState.message);
    } else if (formState.success) {
      toast.success("Announcement Send successfully!");
    }
  }, [formState]);

  const getCourseOptions = () => {
    return courses.map((course) => {
      if ("id" in course && "title" in course) {
        return (
          <option
            key={course.id}
            value={course.id}
            data-testid={`course-option-${course.id}`}
          >
            {course.title}
          </option>
        );
      } else {
        return (
          <option
            key={course.courseId}
            value={course.courseId}
            data-testid={`course-option-${course.courseId}`}
          >
            {course.courseName}
          </option>
        );
      }
    });
  };

  return (
    <div className="w-full mx-auto mt-4 mb-10" data-testid="send-announcement-form">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-lg shadow-md border-1 border-gray-300 overflow-hidden">
        <div className="p-5">
          <form action={formAction} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter Course Title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  data-testid="announcement-title-input"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="courseId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course
                </label>
                <select
                  id="courseId"
                  name="courseId"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  data-testid="announcement-course-select"
                >
                  {getCourseOptions()}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter Course Description"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                rows={12}
                data-testid="announcement-description-textarea"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-2 border-none rounded-md shadow-sm text-lg text-white bg-[#FFA41F]
              cursor-pointer hover:shadow-md hover:bg-[#ffb11f]"
                data-testid="announcement-submit-button"
              >
                {isPending ? "Submitting" : "Submit"}
              </button>
            </div>
            <input
                id="postedBy"
                name="postedBy"
                defaultValue={user.id!}
                type="text"
                placeholder="e.g., Online/Offline course details"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                hidden
                data-testid="announcement-postedby-input"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
