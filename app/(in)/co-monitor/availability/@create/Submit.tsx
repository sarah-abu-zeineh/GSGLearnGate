"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

const Submit = ({ label, ...btnProps }: { label: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      {...btnProps}
      type="submit"
      isLoading={pending}
      disabled={pending}
      className="w-full px-4 py-2 bg-[#FFA41F] text-white rounded-md shadow-sm hover:bg-[#ffd9a0] hover:cursor-pointer hover:scale-102 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#FFA41F] transition-all duration-300 ease-in-out active:scale-95"
    >
      {pending ? "Submitting..." : label}
    </Button>
  );
};

export default Submit;
