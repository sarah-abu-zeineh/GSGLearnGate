"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TaskStatus } from "@/types";

interface IProps {
  value?: number;
  appendSearchParams: boolean;
}

const options = [
  { key: 1, value: TaskStatus.ALL },
  { key: 2, value: TaskStatus.COMPLETED },
  { key: 3, value: TaskStatus.IN_PROGRESS },
];

export default function SelectTaskStatus({ appendSearchParams, value }: IProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialValue =
    options.find((opt) => opt.key === value)?.value || options[0].value;
  const [selectedTaskStatus, setSelectedTaskStatus] =
    useState<TaskStatus>(initialValue);

  useEffect(() => {
    if (appendSearchParams) {
      const paramValue = searchParams.get("taskStatus");
      if (paramValue && options.some((opt) => opt.value === paramValue)) {
        setSelectedTaskStatus(paramValue as TaskStatus);
      } else {
        setSelectedTaskStatus(options[0].value);
        if (searchParams.has("taskStatus")) {
          const params = new URLSearchParams(searchParams.toString());
          params.delete("taskStatus");
          router.push(`?${params.toString()}`, { scroll: false });
        }
      }
    }
  }, [searchParams, appendSearchParams, router]);

  const setSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full md:w-70" data-testid="select-task-status-container">
      <label
        htmlFor="taskStatusList"
        className="block text-sm font-medium text-gray-700"
        data-testid="select-task-status-label"
      >
        Choose Task Status
      </label>
      <select
        id="taskStatusList"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FFA41F] focus:border-[#FFA41F]"
        value={selectedTaskStatus}
        onChange={(e) => {
          const newValue = e.target.value as TaskStatus;
          setSelectedTaskStatus(newValue);
          if (appendSearchParams) {
            setSearchParam("taskStatus", newValue);
          }
        }}
        data-testid="select-task-status-dropdown"
      >
        {options.map((option) => (
          <option
            key={option.key}
            value={option.value}
            data-testid={`select-task-status-option-${option.value}`}
          >
            {option.value}
          </option>
        ))}
      </select>
      <input
        type="hidden"
        name="taskStatus"
        value={selectedTaskStatus}
        data-testid="select-task-status-hidden-input"
      />
    </div>
  );
}
