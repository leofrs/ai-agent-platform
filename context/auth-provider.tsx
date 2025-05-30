"use client";
import { AuthContext } from "./auth-context";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  name: string | null;
  userRole: string | null;
};

export function AuthProvider({ children, name, userRole }: Props) {
  return (
    <AuthContext.Provider value={{ name, userRole }}>
      {children}
    </AuthContext.Provider>
  );
}
