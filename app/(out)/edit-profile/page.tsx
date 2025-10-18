import EditEmailAddress from "@/components/EditEmailAddress/EditEmailAddress";
import EditPassword from "@/components/EditPassword/EditPassword";
import EditPersonalInformation from "@/components/EditPersonalInformation/EditPersonalInformation";
import EditProfileImage from "@/components/EditProfileImage/EditProfileImage";
import { SkipBack } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

const EditProfilePage = () => {
  return (
    <div className="flex flex-col gap-5 justify-center w-[85%] mx-auto my-8">
      <div>
        <Link
          href={"/"}
          className="flex items-center gap-1.5 cursor-pointer text-sm w-fit"
        >
          <SkipBack size={16} />
          Go Back
        </Link>
        <p className="text-lg mt-2">Account information</p>
      </div>
      <div className="border-1 border-gray-400 shadow-xl rounded-lg p-5 flex flex-col gap-5">
        <EditProfileImage />
        <EditPersonalInformation />
        <EditEmailAddress />
        <EditPassword />
      </div>
    </div>
  );
};

export default EditProfilePage;
