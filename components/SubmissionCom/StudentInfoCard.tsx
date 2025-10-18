import React from "react";
import Image from "next/image";

interface Props {
  name: string;
  id: number;
  status: string;
  avatar: string;
}

const StudentInfoCard = ({ name, id, status, avatar }: Props) => {
  return (
    <div
      data-testid={`student-card-${id}`}
      className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center"
    >
      <div className="flex items-center gap-3">
        <Image
          data-testid={`student-avatar-${id}`}
          src={avatar || "/profile (1).png"}
          alt={name}
          width={44}
          height={44}
          className="rounded-full"
        />
        <div>
          <h1 data-testid={`student-name-${id}`} className="text-xl text-orange-400 font-bold">
            {name}
          </h1>
          <p data-testid={`student-id-${id}`} className="text-sm text-[#FFA41F]">
            Student ID: {id}
          </p>
        </div>
      </div>
      <div
        data-testid={`student-status-${id}`}
        className="bg-[#FFA41F]/10 text-[#FFA41F] px-3 py-1 rounded-full text-sm font-medium"
      >
        {status}
      </div>
    </div>
  );
};

export default StudentInfoCard;
