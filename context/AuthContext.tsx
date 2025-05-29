"use client";
import { createContext, useContext } from "react";

export type AuthContextType = {
  name: string | null;
  userRole: string | null;
};

export const AuthContext = createContext<AuthContextType>({
  name: null,
  userRole: null,
});

export const useAuth = () => useContext(AuthContext);
