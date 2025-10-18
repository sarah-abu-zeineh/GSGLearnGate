"use client";

import * as React from "react";

interface TimePickerProps {
  value: string;
  name: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TimePicker({
  name,
  value,
  onChange,
  className,
}: TimePickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value;
    if (
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeValue) ||
      timeValue === ""
    ) {
      onChange(timeValue);
    }
  };

  return (
    <input
      type="time"
      name={name}
      value={value}
      onChange={handleChange}
      className={className}
      step="300"
      data-testid="time-picker-input"
    />
  );
}
