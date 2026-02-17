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

  // Sidebar state
  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved) {
      setIsSidebarCollapsed(saved === "true");
    }
  }, []);

  // ⛔ Prevent flash AFTER hooks
  if (loading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar
        onCollapse={(collapsed) => {
          setIsSidebarCollapsed(collapsed);
          localStorage.setItem("sidebarCollapsed", String(collapsed));
        }}
      />

      <div
        className={`transition-all duration-300 flex-1 ${
          isSidebarCollapsed ? "md:ml-20" : "md:ml-56"
        }`}
      >
        <Navbar />

        <main className="min-h-[calc(100vh-64px)] p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
