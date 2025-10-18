import ForgetPassword from "@/components/ForgetPassword/ForgetPassword";
import React from "react";

const page = () => {
  return (
    <div className="h-dvh flex flex-col justify-center items-center bg-[#eeee]">
      <div className="border-1 border-gray-300 shadow-lg rounded-lg py-5 bg-white">
        <p className="mx-5 pb-5 text-xl">Find your account</p>
        <ForgetPassword />
      </div>
    </div>
  );
};

export default page;
