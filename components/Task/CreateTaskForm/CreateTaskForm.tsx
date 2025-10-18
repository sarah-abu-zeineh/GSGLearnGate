"use client";

import { submitTask, TaskState } from "@/controllers/actions/createTaskAction";
import React, { useState } from "react";
import Submit from "./Submit";
import SelectCourse from "@/components/Dropdowns/SelectCourse";
import { AttachmentSelector } from "../AttachmentSelector/AttachmentSelector";
import { useActionState } from "react";
import { useAuth } from "@/context/user";

type AttachmentType = "none" | "link" | "file";

interface IProps {
  coursesList: { courseId: number; courseName: string }[] | null;
}
export default function CreateTaskForm({ coursesList }: IProps) {
  const { user } = useAuth();
  const [attachment, setAttachment] = useState<{
    type: "link" | "file" | null;
    value: string | File | null;
  }>({ type: null, value: null });

  const initialState: TaskState = {
    success: false,
    message: "",
    error: "",
    taskId: undefined,
  };

  const [formState, formAction] = useActionState(submitTask, initialState);
  const handleSubmit = (formData: FormData) => {
    if (attachment.type === "link" && attachment.value) {
      formData.set("url", attachment.value as string);
    } else if (attachment.type === "file" && attachment.value) {
      formData.set("file", attachment.value as File);
    }
    return formAction(formData);
  };
  const handleAttachmentChange = (
    type: AttachmentType,
    value?: string | File | null
  ) => {
    if (type === "none") {
      setAttachment({ type: null, value: null });
    } else if (type === "link" && typeof value === "string") {
      setAttachment({ type: "link", value });
    } else if (type === "file" && value instanceof File) {
      setAttachment({ type: "file", value });
    }
  };

  return (
    <form
      action={handleSubmit}
      data-testid="create-task-form"
      className="space-y-4 max-w-6xl mx-auto p-4 border-none rounded-lg shadow-sm bg-white"
    >
      <h2 className="text-xl font-semibold text-[#FFA41F]" data-testid="form-title">
        Create New Task
      </h2>

      {formState.message && (
        <div
          className={`p-2 ${formState.success ? "bg-green-100" : "bg-red-100"}`}
          data-testid="form-message"
        >
          {formState.message}
          {formState.success &&
            formState.taskId &&
            ` Task ID: ${formState.taskId}`}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="w-full">
          <label
            htmlFor="taskTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Task Title
          </label>
          <input
            type="hidden"
            name="monitorId"
            value={user.userId?.toString()}
          />
          <input
            type="text"
            name="title"
            id="taskTitle"
            data-testid="task-title-input"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FFA41F] focus:border-[#FFA41F]"
            placeholder="Input Text"
          />
        </div>

        <div className="p-0 w-full md:w-70 mb-5" data-testid="select-course-wrapper">
          <SelectCourse options={coursesList} appendSearchParams={false} />
        </div>
      </div>

      <div>
        <label
          htmlFor="taskDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Task Description
        </label>
        <textarea
          id="taskDescription"
          name="description"
          data-testid="task-description-input"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FFA41F] focus:border-[#FFA41F]"
          rows={3}
          placeholder="Input Text"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="w-full">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700"
          >
            Due Date
          </label>
          <input
            name="dueDate"
            type="date"
            id="dueDate"
            data-testid="due-date-input"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FFA41F] focus:border-[#FFA41F]"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="point"
            className="block text-sm font-medium text-gray-700"
          >
            Task Point
          </label>
          <input
            type="number"
            id="point"
            name="points"
            data-testid="task-point-input"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FFA41F] focus:border-[#FFA41F]"
            placeholder="Input point"
          />
        </div>
      </div>

      <div className="my-10" data-testid="attachment-selector-wrapper">
        <AttachmentSelector onAttachmentChange={handleAttachmentChange} />
      </div>

      <div data-testid="submit-button-wrapper">
        <Submit label="Create Task" />
      </div>
    </form>
  );
}
