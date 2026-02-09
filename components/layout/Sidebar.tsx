"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  Package,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

type MenuKey = "dashboard" | "users" | "billing" | "packages" | "settings";

export default function Sidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState<Record<MenuKey, boolean>>({
    dashboard: false,
    users: false,
    billing: false,
    packages: false,
    settings: false,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setOpen({
      dashboard: pathname === "/dashboard",
      users: pathname.startsWith("/dashboard/users"),
      billing: pathname.startsWith("/dashboard/billing"),
      packages: pathname.startsWith("/dashboard/packages"),
      settings: pathname.startsWith("/dashboard/settings"),
    });
  }, [pathname]);

  const toggle = (key: MenuKey) => {
    setOpen(prev =>
      Object.keys(prev).reduce((acc, k) => {
        acc[k as MenuKey] = k === key ? !prev[key] : false;
        return acc;
      }, {} as Record<MenuKey, boolean>)
    );
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const nestedClass = (active: boolean) =>
    `block rounded-md px-4 py-2 text-sm transition
     ${
       active
         ? "bg-indigo-600 text-white"
         : "text-gray-300 hover:bg-gray-800 hover:text-white"
     }`;

  return (
    <aside
      className={`fixed md:static inset-y-0 left-0 z-40 w-55 bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-800 flex flex-col
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      transition-transform duration-300`}
    >
      {/* LOGO */}
      <div className="h-14 flex items-center px-6 border-b border-gray-800">
        <span className="text-lg font-bold text-white">
          <span className="text-indigo-500">S</span>ystem
        </span>
      </div>

      {/* MOBILE TOGGLE */}
      <button
        className="md:hidden absolute top-4 right-4 text-white"
        onClick={() => setIsSidebarOpen(p => !p)}
      >
        {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* NAV */}
      <nav className="flex-1 px-4 py-6 space-y-5">
        {/* DASHBOARD */}
        <Section
          title="Dashboard"
          icon={<LayoutDashboard size={16} />}
          open={open.dashboard}
          onClick={() => toggle("dashboard")}
        >
          <Link href="/dashboard" className={nestedClass(isActive("/dashboard"))}>
            Overview
          </Link>
        </Section>

        {/* USERS */}
        <Section
          title="Users"
          icon={<Users size={16} />}
          open={open.users}
          onClick={() => toggle("users")}
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
        </Section>

        {/* PACKAGES */}
        <Section
          title="Packages"
          icon={<Package size={16} />}
          open={open.packages}
          onClick={() => toggle("packages")}
        >
          <Link
            href="/dashboard/packages"
            className={nestedClass(isActive("/dashboard/packages"))}
          >
            All Packages
          </Link>
          <Link
            href="/dashboard/packages/create"
            className={nestedClass(isActive("/dashboard/packages/create"))}
          >
            Create Package
          </Link>
        </Section>

        {/* BILLING */}
        <Section
          title="Billing"
          icon={<CreditCard size={16} />}
          open={open.billing}
          onClick={() => toggle("billing")}
        >
          <Link
            href="/dashboard/billing"
            className={nestedClass(isActive("/dashboard/billing"))}
          >
            Payments
          </Link>
        </Section>

        {/* SETTINGS */}
        <Section
          title="Settings"
          icon={<Settings size={16} />}
          open={open.settings}
          onClick={() => toggle("settings")}
        >
          <Link
            href="/dashboard/settings"
            className={nestedClass(isActive("/dashboard/settings"))}
          >
            System Settings
          </Link>
        </Section>
      </nav>

      {/* FOOTER */}
      <div className="border-t border-gray-800 p-4 text-xs text-gray-500">
        © {new Date().getFullYear()} System
      </div>
    </aside>
  );
}

/* ===== REUSABLE SECTION COMPONENT ===== */

function Section({
  title,
  icon,
  open,
  onClick,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  open: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-gray-400 hover:text-white"
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide">
          {icon}
          {title}
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-0" : "-rotate-90"}`}
        />
      </button>

      <div
        className={`ml-2 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${
          open ? "max-h-40" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
