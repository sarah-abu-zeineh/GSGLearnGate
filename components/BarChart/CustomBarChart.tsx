"use client"
import { StudentCourseChart } from "@/types";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface IProps {
  chartData: StudentCourseChart[];
}

const CustomBarChart = (props: IProps) => {
  return (
    <div
      className="w-full h-96 shadow-md shadow-gray-300/80 rounded-lg bg-[#f7fdff]"
      data-testid="custom-bar-chart-container"
    >
      <ResponsiveContainer width="100%" height="100%" data-testid="custom-bar-chart-responsive">
        <BarChart
          data={props.chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          data-testid="custom-bar-chart"
        >
          <CartesianGrid strokeDasharray="2 2" data-testid="custom-bar-chart-grid" />
          <XAxis dataKey="course" data-testid="custom-bar-chart-xaxis" />
          <YAxis data-testid="custom-bar-chart-yaxis" />
          <Tooltip data-testid="custom-bar-chart-tooltip" />
          <Bar dataKey="students" fill="#FFA41F" barSize={50} data-testid="custom-bar-chart-bar" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
