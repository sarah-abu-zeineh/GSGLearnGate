import Link from "next/link";
import React from "react";

const ResetPassword = () => {
  return (
    <form data-testid="reset-password-form">
      <div
        data-testid="reset-password-code-input-wrapper"
        className="px-5 py-5 flex flex-col border-b-1 border-t-1 border-gray-300"
      >
        <label htmlFor="code" data-testid="reset-password-code-label">
          Please check your email for a message with your code.
          <br />
          Your code is 6 number long.
        </label>
        <input
          data-testid="reset-password-code-input"
          type="number"
          name="code"
          id="code"
          placeholder="Enter code"
          required
          className="border-1 border-gray-300 rounded px-2.5 py-1.5 mt-2 focus:outline-blue-400"
        />
      </div>
      <div
        data-testid="reset-password-buttons"
        className="pt-5 flex gap-2 justify-end mx-5"
      >
        <Link
          data-testid="reset-password-cancel-button"
          href={"/forget-password"}
          className="bg-[#eeee] rounded py-0.5 px-2.5 cursor-pointer"
        >
          Cancel
        </Link>
        <input
          data-testid="reset-password-continue-button"
          type="submit"
          value="Continue"
          className="bg-[#222831] hover:bg-[#393E46] text-white rounded py-0.5 px-2.5 cursor-pointer"
        />
      </div>
    </form>
  );
};

export default ResetPassword;
