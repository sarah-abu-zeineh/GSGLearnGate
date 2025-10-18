import React, { ReactNode } from "react";

interface StatusCardProps {
  title: string;
  icon: ReactNode;
  iconColor: string;
  value: string | number;
  subtitle?: string;
  progress?: number;
}

const StatusCard = ({
  title,
  icon,
  iconColor,
  value,
  subtitle,
  progress,
}: StatusCardProps) => {
  return (
    <div data-testid="status-card" className="bg-white border border-[#FFA41F]/30 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between" data-testid="status-card-header">
        <h3 data-testid="status-card-title" className={`text-${iconColor}-600 text-lg font-semibold`}>
          {title}
        </h3>
        <div data-testid="status-card-icon" className={`bg-${iconColor}-100 p-2 rounded-full`}>
          {icon}
        </div>
      </div>
      <p data-testid="status-card-value" className="text-2xl font-bold text-[#FFA41F] mt-2">{value}</p>
      <div className="flex items-center mt-1 text-sm text-gray-500" data-testid="status-card-footer">
        {subtitle && <span data-testid="status-card-subtitle">{subtitle}</span>}
        <div className="w-16 h-1.5 bg-gray-200 rounded-full ml-2" data-testid="status-card-progress-bar">
          <div
            className="h-full bg-[#FFA41F] rounded-full"
            style={{ width: `${progress}%` }}
            data-testid="status-card-progress-fill"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
