"use client";
import { submitUser, UserState } from "@/controllers/actions/updateUserAction";
import { getUserById } from "@/src/db/queries/select";
import { Image as ImageIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Shared/Loader";

export default function UpdateMonitorForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const initialState: UserState = {
    success: false,
    error: "",
    message: "",
  };
  const [formState, formAction, isPending] = useActionState(
    submitUser,
    initialState
  );
  const [selectedImg, setSelectedImg] = useState("");
  const [formData, setFormData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    role: "",
    city: "",
  });

  useEffect(() => {
    const fetchCourse = async () => {
      if (id) {
        const data = await getUserById(Number(id));
        if (data) {
          setFormData({
            image: data.image || "",
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            dateOfBirth: data.dateOfBirth
              ? new Date(data.dateOfBirth).toISOString().split("T")[0]
              : "",
            role: data.role || "",
            city: data.city || "",
          });
          setSelectedImg(data.image);
        }
      }
      setLoading(false);
    };
    fetchCourse();
  }, [id]);

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
      toast.success("User Updated successfully!");
    }
  }, [formState]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <Loader data-testid="update-monitor-loader" />;
  }

  return (
    <div className="w-full mx-auto mt-4 mb-10" data-testid="update-monitor-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        className="bg-white rounded shadow-md overflow-hidden p-5 border-1 border-gray-300"
        data-testid="update-monitor-card"
      >
        <h1 className="text-xl font-semibold text-[#FFA41F]" data-testid="update-monitor-title">
          Update User
        </h1>
        <form action={formAction} className="space-y-5" data-testid="update-monitor-form">
          <input type="hidden" name="id" value={id} data-testid="input-id" />

          <div className="flex flex-col items-center" data-testid="image-upload-section">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              data-testid="input-image"
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
            <span className="text-sm text-gray-600 mt-5">Update Monitor Image</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                data-testid="input-first-name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                data-testid="input-last-name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              data-testid="input-email"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                data-testid="input-date-of-birth"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter your city"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                data-testid="input-city"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 border-none rounded-md shadow-sm text-lg text-white bg-[#FFA41F]
              cursor-pointer hover:shadow-md hover:bg-[#ffb11f]"
              disabled={isPending}
              data-testid="submit-button"
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
