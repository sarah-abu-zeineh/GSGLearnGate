"use client";
import {
  loginUser,
  LoginUserStatus,
} from "@/controllers/actions/loginUserAction";
import Link from "next/link";
import React, { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@/types";

const initialState: LoginUserStatus = {
  success: false,
  message: "",
  error: "",
  userId: undefined,
  id: undefined,
  role: undefined,
};

const LoginForm = () => {
  const [formState, action] = useActionState(loginUser, initialState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (formState.success) {
      setLoading(true);
      switch (formState.role) {
        case Role.ADMIN:
          router.push("/admin");
          break;
        case Role.MONITOR:
          router.push("/monitor");
          break;
        case Role.CO_MONITOR:
          router.push("/co-monitor");
          break;
        case Role.STUDENT:
          router.push("/student");
          break;
        default:
          router.push("");
      }
    }
  }, [formState.success, formState.role, router]);

  return (
    <form
      action={action}
      data-testid="login-form"
      className="p-5 w-[90%] sm:w-96 flex flex-col gap-5 bg-[#EEEEEE] rounded-lg shadow-lg"
    >
      <div className="flex flex-col gap-1.5" data-testid="email-container">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-1 border-gray-300 px-1.5 py-1 rounded focus:outline-blue-500 bg-white"
          required
          data-testid="email-input"
        />
      </div>

      <div className="flex flex-col gap-1.5" data-testid="password-container">
        <div className="flex justify-between items-center">
          <label htmlFor="password">Password</label>
          <Link
            href={"/forget-password"}
            className="text-blue-400 hover:underline"
            data-testid="forget-password-link"
          >
            Forget password?
          </Link>
        </div>
        <input
          type="password"
          name="password"
          id="password"
          className="border-1 border-gray-300 px-1.5 py-1 rounded focus:outline-blue-500 bg-white"
          required
          data-testid="password-input"
        />
      </div>

      {formState.error && (
        <p className="text-red-500 text-sm" data-testid="login-error">
          {formState.error}
        </p>
      )}

      <input
        disabled={loading}
        type="submit"
        value={loading ? "Loading..." : "Sign in"}
        className="mt-1.5 bg-[#222831] hover:bg-[#393E46] rounded p-2 text-white cursor-pointer"
        data-testid="login-submit-button"
      />
    </form>
  );
};

export default LoginForm;
