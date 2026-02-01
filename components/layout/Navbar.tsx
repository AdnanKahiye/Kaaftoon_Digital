"use client";

import { useRouter } from "next/navigation";
import { AuthService } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      {/* ===== LEFT ===== */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-gray-900">
          Dashboard
        </h1>
      </div>

      {/* ===== RIGHT ===== */}
      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
            {user?.email?.charAt(0).toUpperCase() ?? "U"}
          </div>

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-medium">
              {user?.email ?? "User"}
            </span>
            <span className="text-xs text-gray-500">
              {user?.role ?? "User"}
            </span>
          </div>
        </div>

        {/* Logout */}
   <button
  onClick={handleLogout}
  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm 
             bg-red-600 text-white 
             hover:bg-red-700 transition"
>
  <LogOut className="h-4 w-4" />
  Logout
</button>

      </div>
    </header>
  );
}
