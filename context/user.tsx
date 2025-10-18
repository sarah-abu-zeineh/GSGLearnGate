"use client";
import { createContext, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

interface DecodedToken {
  email?: string;
  role?: string;
  id?: number;
  userId?: number;
}

interface User {
  email: string;
  role: string;
  userId: number | null;
  id: number | null;
}

interface AuthContextType {
  token: string | null;
  user: User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>({
    email: "",
    role: "",
    userId: null,
    id: null,
  });

  useEffect(() => {
    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(";").shift();
        return cookieValue ? decodeURIComponent(cookieValue) : undefined;
      }
    }
    setToken(getCookie("token") || null);
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt.decode(token) as DecodedToken | null;
        if (decodedToken) {
          const newUser = {
            email: decodedToken.email || "",
            role: decodedToken.role || "",
            userId: decodedToken.userId || null,
            id: decodedToken.id || null,

          };
          setUser(newUser);
        }
      } catch (error) {
        throw new Error("CODE:3011");
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;

}

interface DecodedToken {
  email?: string;
  role?: string;
  userId?: number;
}

export function getUserFromToken(token: string | null) {
  if (!token) return null;

  try {
    const decodedToken = jwt.decode(token) as DecodedToken | null;
    if (decodedToken) {
      return {
        email: decodedToken.email || "",
        role: decodedToken.role || "",
        userId: Number(decodedToken.userId) || -1,
      };
    }
  } catch {
    throw new Error("CODE:3011");
  }
  return null;
}
