import React from "react";

interface IProps {
  setOpen: (open: boolean) => void;
  confirmDelete: () => void;
  selectedUser?: string;
  selectedCourse?: number;
}

const DeleteUserModal = (props: IProps) => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center backdrop-blur-sm z-50"
      data-testid="delete-user-modal-overlay"
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-80"
        data-testid="delete-user-modal-container"
      >
        <h2
          className="text-lg font-semibold text-gray-800"
          data-testid="delete-user-modal-title"
        >
          Delete User
        </h2>
        <p
          className="text-gray-600 mt-2"
          data-testid="delete-user-modal-message"
        >
          Are you sure you want to delete{" "}
          <b data-testid="delete-user-modal-target">
            {props.selectedUser ? props.selectedUser : props.selectedCourse}
          </b>
          ?
        </p>
        <div
          className="mt-4 flex justify-end space-x-3"
          data-testid="delete-user-modal-actions"
        >
          <button
            onClick={() => props.setOpen(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md cursor-pointer"
            data-testid="delete-user-modal-cancel-btn"
          >
            Cancel
          </button>
          <button
            onClick={props.confirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer"
            data-testid="delete-user-modal-confirm-btn"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
