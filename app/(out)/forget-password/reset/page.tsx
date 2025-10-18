import ResetPassword from "@/components/ResetPassword/ResetPassword";
import React from "react";

const ResetPage = () => {
  return (
    <div className="h-dvh flex flex-col justify-center items-center bg-[#eeee]">
      <div className="border-1 border-gray-300 shadow-lg rounded-lg py-5 bg-white">
        <p className="mx-5 pb-5 text-xl">Enter security code</p>
        <ResetPassword />
      </div>
    </div>
  );
};

export default ResetPage;
