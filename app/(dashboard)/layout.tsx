"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved) {
      setIsSidebarCollapsed(saved === "true");
    }
  }, []);

  return (
    <div className="min-h-screen ">
      {/* Sidebar */}
      <Sidebar
        onCollapse={(collapsed) => {
          setIsSidebarCollapsed(collapsed);
          localStorage.setItem("sidebarCollapsed", String(collapsed));
        }}
      />

      {/* Content Wrapper */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? "md:pl-20" : "md:pl-56"}
        `}
      >
        <Navbar />

        <main className="min-h-[calc(100vh-64px)] p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
