"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";

type Role = "Administrator" | "Manager" | "Employee" | "User";

interface AuthUser {
  email: string;
  role: Role;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

 // alert("AuthProvider mounted");
  useEffect(() => {
    // Ask backend: "Who am I?"
    api
      .get("/User/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
