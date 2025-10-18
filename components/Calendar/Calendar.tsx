import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function Calendar() {
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <DayPicker mode="single" selected={date} onSelect={setDate} initialFocus />
  );
}
