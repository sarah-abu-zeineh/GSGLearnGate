"use client";
import { submitUser, UserState } from "@/controllers/actions/addUserAction";
import { Role } from "@/types";
import { Image as ImageIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddMonitorForm() {
  const initialState: UserState = {
    success: false,
    error: "",
    message: "",
    id: undefined,
  };
  const [formState, formAction, isPending] = useActionState(
    submitUser,
    initialState
  );
  const [selectedImg, setSelectedImg] = useState("");
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImg(imageUrl);
    }
  };
  useEffect(() => {
    if (formState.error) {
      toast.error(formState.message);
    } else if (formState.success) {
      toast.success("User Added successfully!");
      setSelectedImg("");
    }
  }, [formState]);

  return (
    <div className="w-full mx-auto mt-4 mb-10" data-testid="add-user-form-container">
      <ToastContainer position="top-right" autoClose={3000} data-testid="toast-container" />
      <div className="bg-white rounded shadow-md overflow-hidden p-5 border-1 border-gray-300" data-testid="form-wrapper">
        <h1 className="text-xl font-semibold text-[#FFA41F]" data-testid="form-title">Add User</h1>
        <form action={formAction} className="space-y-5" data-testid="add-user-form">
          <div className="flex flex-col items-center">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              required
              data-testid="image-input"
            />
            <label
              htmlFor="image"
              className="flex justify-center items-center w-16 h-16 rounded-full cursor-pointer bg-gray-100 border-2 border-gray-300"
              data-testid="image-label"
            >
              {selectedImg ? (
                <Image
                  src={selectedImg}
                  alt="Selected"
                  className="rounded-full object-cover"
                  width={70}
                  height={70}
                  data-testid="selected-image"
                />
              ) : (
                <ImageIcon className="w-8 h-8 text-gray-500" data-testid="default-image-icon" />
              )}
            </label>
            <span className="text-sm text-gray-600 mt-5" data-testid="image-upload-text">
              Upload Monitor / CO-Monitor Image
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
                data-testid="first-name-label"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                data-testid="first-name-input"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
                data-testid="last-name-label"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                data-testid="last-name-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
              data-testid="email-label"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              data-testid="email-input"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
              data-testid="password-label"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              data-testid="password-input"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700"
                data-testid="dob-label"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                data-testid="dob-input"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
                data-testid="city-label"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter your city"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                data-testid="city-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
              data-testid="role-label"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              data-testid="role-select"
            >
              <option value={Role.MONITOR} data-testid="role-monitor">Monitor</option>
              <option value={Role.CO_MONITOR} data-testid="role-co-monitor">Co-Monitor</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 border-none rounded-md shadow-sm text-lg text-white bg-[#FFA41F]
              cursor-pointer hover:shadow-md hover:bg-[#ffb11f]"
              data-testid="submit-button"
            >
              {isPending ? "Submitting" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
