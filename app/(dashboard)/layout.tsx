"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // 🔐 AUTH GUARD
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  // Sync state with localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved) {
      setIsSidebarCollapsed(saved === "true");
    }
  }, []);

  if (loading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 1. SIDEBAR: Fixed position */}
      <Sidebar
        onCollapse={(collapsed) => {
          setIsSidebarCollapsed(collapsed);
          localStorage.setItem("sidebarCollapsed", String(collapsed));
        }}
      />

      {/* 2. MAIN CONTENT WRAPPER */}
      {/* We use padding-left instead of margin-left to ensure the Navbar 
          background (which is width: 100%) stays attached to the sidebar boundary */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? "md:pl-20" : "md:pl-[260px]" 
        }`}
      >
        {/* 3. NAVBAR: Now width: 100% inside the flex-1 container */}
        <Navbar />

        {/* 4. PAGE CONTENT */}
        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}