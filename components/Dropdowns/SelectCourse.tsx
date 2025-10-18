"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface IProps {
  value?: number;
  appendSearchParams: boolean;
  options: { courseId: number; courseName: string }[] | null;
}

export default function SelectCourse({
  appendSearchParams,
  options,
  value,
}: IProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, setSelectedCourseId] = useState<number>();

  const setSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full md:w-70" data-testid="select-course-container">
      <label
        htmlFor="course"
        className="block text-sm font-medium text-gray-700"
        data-testid="select-course-label"
      >
        Choose Course
      </label>
      <select
        id="course"
        name="courseId"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FFA41F] focus:border-[#FFA41F]"
        value={value}
        onChange={(e) => {
          if (appendSearchParams) {
            setSearchParam("courseId", e.target.value);
          }
          setSelectedCourseId(Number(e.target.value));
        }}
        data-testid="select-course-dropdown"
      >
        {options != null ? (
          options.map((option) => (
            <option
              key={option.courseId}
              value={option.courseId}
              data-testid={`select-course-option-${option.courseId}`}
            >
              {option.courseName}
            </option>
          ))
        ) : (
          <option key={-1} value={-1} data-testid="select-course-no-options">
            No Courses
          </option>
        )}
      </select>
    </div>
  );
}
