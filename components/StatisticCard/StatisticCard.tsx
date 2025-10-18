import React, { ReactNode } from "react";

interface IProps {
  title: string;
  total: number;
  icon: ReactNode;
}

const StatisticCard = (props: IProps) => {
  return (
    <div
      data-testid="statistic-card"
      className="flex p-10 shadow-md shadow-gray-300/80 rounded-lg bg-[#f7fdff] justify-between items-center"
    >
      <div className="flex flex-col" data-testid="statistic-info">
        <p data-testid="statistic-title" className="text-gray-400 text-xl">
          {props.title}
        </p>
        <p data-testid="statistic-total" className="text-lg">
          {props.total}
        </p>
      </div>
      <div data-testid="statistic-icon" className="bg-[#FFF5E8] p-2 rounded-2xl">
        {props.icon}
      </div>
    </div>
  );
};

export default StatisticCard;
