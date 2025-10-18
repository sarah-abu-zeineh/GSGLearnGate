import Link from "next/link";
import React from "react";

const ForgetPassword = () => {
  return (
    <form data-testid="forget-password-form">
      <div
        className="px-5 py-5 flex flex-col border-b-1 border-t-1 border-gray-300"
        data-testid="forget-password-input-container"
      >
        <label htmlFor="email" data-testid="forget-password-label">
          Please enter your email to search for your account.
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
          className="border-1 border-gray-300 rounded px-2.5 py-1.5 mt-2 focus:outline-blue-400"
          data-testid="forget-password-email-input"
        />
      </div>
      <div
        className="pt-5 flex gap-2 justify-end mx-5"
        data-testid="forget-password-buttons"
      >
        <Link
          href={"/login"}
          className="bg-[#eeee] rounded py-0.5 px-2.5 cursor-pointer"
          data-testid="forget-password-cancel-button"
        >
          Cancel
        </Link>
        <input
          type="submit"
          value="Reset"
          className="bg-[#222831] hover:bg-[#393E46] text-white rounded py-0.5 px-2.5 cursor-pointer"
          data-testid="forget-password-submit-button"
        />
      </div>
    </form>
  );
};

export default ForgetPassword;
