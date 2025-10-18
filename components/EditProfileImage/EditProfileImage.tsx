"use client";
import Image from "next/image";
import React, { useState } from "react";
import EditProfileModal from "../modals/EditProfileModal/EditProfileModal";

const EditProfileImage = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      className="border-1 p-5 rounded-md"
      data-testid="edit-profile-image-container"
    >
      <div
        className="flex justify-between items-center"
        data-testid="edit-profile-image-header"
      >
        <p className="text-xl font-bold" data-testid="edit-profile-image-title">
          Profile Image
        </p>
        <button
          onClick={() => setOpenModal(true)}
          className="border-1 border-gray-400 rounded py-0.5 px-3 cursor-pointer text-sm hover:bg-[var(--primary-color)] hover:text-white transition-all"
          data-testid="edit-profile-image-button"
        >
          Edit
        </button>
      </div>

      <div
        className="border-1 w-16 h-16 rounded-full mt-5 flex justify-center items-center overflow-hidden"
        data-testid="edit-profile-image-preview"
      >
        <Image
          src={"/img/Unknown_person.jpg"}
          alt="user profile image"
          width={64}
          height={64}
        />
      </div>

      {openModal && (
        <EditProfileModal
          onClose={() => setOpenModal(false)}
          typeOfEdit={"editImage"}
          data-testid="edit-profile-image-modal"
        />
      )}
    </div>
  );
};

export default EditProfileImage;
