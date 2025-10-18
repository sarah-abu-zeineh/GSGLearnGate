"use server";
import { cookies } from "next/headers";

export async function logoutUser(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const cookieStore = await cookies();

    cookieStore.delete("token");
    cookieStore.delete("role");

    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch {
    return {
      success: false,
      message: "Logout failed",
    };
  }
}
