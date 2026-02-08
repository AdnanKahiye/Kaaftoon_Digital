"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState({
    dashboard: false,
    users: false,
    billing: false,
    settings: false,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // For mobile view

  useEffect(() => {
    setOpen({
      dashboard: pathname === "/dashboard",
      users: pathname.startsWith("/dashboard/users"),
      billing: pathname.startsWith("/dashboard/billing"),
      settings: pathname.startsWith("/dashboard/settings"),
    });
  }, [pathname]);

  const toggle = (key: keyof typeof open) => {
    setOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const nestedClass = (active: boolean) =>
    `block rounded-lg px-4 py-2 text-sm transition
     ${active
       ? "bg-indigo-600 text-white"
       : "text-gray-300 hover:bg-gray-800 hover:text-white"}`;

  return (
    <aside
      className={`w-64 min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-800 flex flex-col 
      ${isSidebarOpen ? "block" : "hidden md:block"}`}
    >
      {/* ===== LOGO ===== */}
      <div className="h-14 flex items-center px-6 border-b border-gray-800">
        <span className="text-lg font-bold text-white">
          <span className="text-indigo-500">S</span>ystem
        </span>
      </div>

      {/* ===== TOGGLE BUTTON FOR MOBILE VIEW ===== */}
      <button
        className="md:hidden absolute top-4 right-4 text-white"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* ===== NAVIGATION ===== */}
      <nav className="flex-1 px-4 py-6 space-y-6">
        {/* ===== DASHBOARD ===== */}
        <div>
          <button
            onClick={() => toggle("dashboard")}
            className="w-full flex items-center justify-between text-gray-400 hover:text-white mb-2"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </div>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                open.dashboard ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              open.dashboard ? "max-h-20" : "max-h-0"
            }`}
          >
            <Link
              href="/dashboard"
              className={nestedClass(isActive("/dashboard"))}
            >
              Overview
            </Link>
          </div>
        </div>

        {/* ===== USERS ===== */}
        <div>
          <button
            onClick={() => toggle("users")}
            className="w-full flex items-center justify-between text-gray-400 hover:text-white mb-2"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide">
              <Users className="h-4 w-4" />
              Users
            </div>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                open.users ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>

          <div
            className={`ml-2 space-y-1 overflow-hidden transition-all duration-300 ${
              open.users ? "max-h-32" : "max-h-0"
            }`}
          >
            <Link
              href="/dashboard/users"
              className={nestedClass(isActive("/dashboard/users"))}
            >
              List Users
            </Link>

            <Link
              href="/dashboard/users/create"
              className={nestedClass(isActive("/dashboard/users/create"))}
            >
              Create User
            </Link>
          </div>
        </div>

        {/* ===== BILLING ===== */}
        <div>
          <button
            onClick={() => toggle("billing")}
            className="w-full flex items-center justify-between text-gray-400 hover:text-white mb-2"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide">
              <CreditCard className="h-4 w-4" />
              Billing
            </div>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                open.billing ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>

          <div
            className={`ml-2 overflow-hidden transition-all duration-300 ${
              open.billing ? "max-h-20" : "max-h-0"
            }`}
          >
            <Link
              href="/dashboard/billing"
              className={nestedClass(isActive("/dashboard/billing"))}
            >
              Payments
            </Link>
          </div>
        </div>

        {/* ===== SETTINGS ===== */}
        <div>
          <button
            onClick={() => toggle("settings")}
            className="w-full flex items-center justify-between text-gray-400 hover:text-white mb-2"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide">
              <Settings className="h-4 w-4" />
              Settings
            </div>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                open.settings ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>

          <div
            className={`ml-2 overflow-hidden transition-all duration-300 ${
              open.settings ? "max-h-20" : "max-h-0"
            }`}
          >
            <Link
              href="/dashboard/settings"
              className={nestedClass(isActive("/dashboard/settings"))}
            >
              System Settings
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== FOOTER ===== */}
      <div className="border-t border-gray-800 p-4 text-xs text-gray-500">
        © {new Date().getFullYear()} System
      </div>
    </aside>
  );
}
