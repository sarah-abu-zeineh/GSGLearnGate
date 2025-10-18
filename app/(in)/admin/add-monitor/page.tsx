import React from "react";
import AddMonitorForm from "@/components/AddMonitorForm/AddMonitorForm";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";

const AddMonitorPage = () => {
  return (
    <div className="w-11/12 m-auto flex flex-col">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-xl font-semibold">Add Monitors and Co-monitors</h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Hi, Admin</span>
          <UserCircle size={32} weight="duotone" className="text-[#FFA41F]" />
        </div>
      </div>
      <AddMonitorForm />
    </div>
  );
};

export default AddMonitorPage;