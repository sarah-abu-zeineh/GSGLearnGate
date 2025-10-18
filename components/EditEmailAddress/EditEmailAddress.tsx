"use client";
import React, { useState } from "react";
import EditProfileModal from "../modals/EditProfileModal/EditProfileModal";

const EditEmailAddress = () => {
  const user = {
    email: "mo.qashqesh@gmail.com",
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      className="border-1 p-5 rounded-md"
      data-testid="edit-email-container"
    >
      <div
        className="flex justify-between items-center"
        data-testid="edit-email-header"
      >
        <p className="text-xl font-bold" data-testid="edit-email-title">
          Email Address
        </p>
        <button
          onClick={() => setOpenModal(true)}
          className="border-1 border-gray-400 rounded py-0.5 px-3 cursor-pointer text-sm hover:bg-[var(--primary-color)] hover:text-white transition-all"
          data-testid="edit-email-button"
        >
          Edit
        </button>
      </div>

      <p
        className="text-[#777] text-sm"
        data-testid="edit-email-current-value"
      >
        {user.email}
      </p>

      {openModal && (
        <EditProfileModal
          onClose={() => setOpenModal(false)}
          typeOfEdit="editEmailAddress"
          data-testid="edit-email-modal"
        />
      )}
    </div>
  );
};

export default EditEmailAddress;
