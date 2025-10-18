"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export interface DecodedToken {
  email?: string;
  role?: string;
  userId?: number;
  id?: number;
}

export interface AuthUser {
  email: string;
  role: string;
  userId: number;
  id: number;
}

export async function getUserFromToken(
  token: string | null
): Promise<AuthUser | null> {
  if (!token) return null;

  try {
    const decodedToken = jwt.decode(token) as DecodedToken | null;
    if (decodedToken) {
      return {
        email: decodedToken.email || "",
        role: decodedToken.role || "",
        userId: Number(decodedToken.userId) || -1,
        id: Number(decodedToken.id) || -1,
      };
    }
  } catch {
    throw new Error("CODE:1009");
  }
  return null;
}

export async function requireAuth(): Promise<AuthUser> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let user;
  if (token) {
    user = await getUserFromToken(token);
  }
  if (!user) {
    throw new Error("User not authenticated");
  }

  return user;
}
