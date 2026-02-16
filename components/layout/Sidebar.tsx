"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  CreditCard,
  Settings,
  Package,
  ChevronDown,
  Menu,
  X,
  Search,
} from "lucide-react";

type Role = "Administrator" | "Manager" | "Employee" | "User";

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

/* ================= MENU CONFIG ================= */

const MENU_ITEMS = [
  {
    key: "dashboard",
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["Administrator", "Manager", "Employee", "User"] as Role[],
  },
  {
    key: "settings",
    title: "Settings",
    icon: Settings,
    roles: ["Administrator"] as Role[],
    children: [
      { title: "Users", href: "/dashboard/users" },
      { title: "Category", href: "/dashboard/Services" },
      { title: "Services", href: "/dashboard/Item" },
    ],
  },
  {
    key: "packages",
    title: "Packages",
    icon: Package,
    roles: ["Administrator", "Manager"] as Role[],
    children: [
      { title: "All Packages", href: "/dashboard/packages" },
      { title: "Package Requests", href: "/dashboard/packagesRequest" },
    ],
  },
  {
    key: "customers",
    title: "Customers",
    icon: Package,
    roles: ["Administrator", "Manager"] as Role[],
    children: [
      { title: "All Customers", href: "/dashboard/Customer" },
      { title: "Sales Customers", href: "/dashboard/Sales" },
       { title: "Sales List", href: "/dashboard/Sale" },
    ],
  },
  {
    key: "billing",
    title: "Billing",
    icon: CreditCard,
    roles: ["Administrator"] as Role[],
    children: [{ title: "Payments", href: "/dashboard/unpaid" }],
  },
];

/* ================= SIDEBAR ================= */

export default function Sidebar({ onCollapse }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const role = user?.role as Role | undefined;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  /* ===== Auto open active section ===== */

  useEffect(() => {
    const activeSection = MENU_ITEMS.find(item =>
      item.children?.some(child =>
        pathname.startsWith(child.href)
      )
    );

    if (activeSection) {
      setOpen(prev => ({
        ...prev,
        [activeSection.key]: true,
      }));
    }
  }, [pathname]);

  /* ===== Filter by role ===== */

  const allowedMenus = MENU_ITEMS.filter(item =>
    role ? item.roles.includes(role) : false
  );

  /* ===== Collapse persistence ===== */

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved) {
      const collapsed = saved === "true";
      setIsCollapsed(collapsed);
      onCollapse?.(collapsed);
    }
  }, [onCollapse]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  /* ===== Toggle section ===== */

  const toggle = (key: string) => {
    if (isCollapsed) return;

    setOpen(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", String(newState));
    onCollapse?.(newState);
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const nestedClass = (active: boolean) =>
    `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-all duration-200
    ${active ? "text-white" : "text-gray-400 hover:bg-gray-800/60 hover:text-white"}`;

  /* ================= RENDER ================= */

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col
        bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-800
        transition-all duration-300
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${isCollapsed ? "w-20" : "w-56"}`}
      >
        {/* Header */}
        <div className={`flex h-16 items-center border-b border-gray-800
          ${isCollapsed ? "justify-center" : "justify-between px-4"}`}>
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 flex items-center justify-center bg-indigo-600 rounded-lg text-white font-bold">
                  S
                </div>
                <span className="text-white font-semibold">System</span>
              </div>
              <button onClick={toggleCollapse}>
                <Menu size={18} className="text-gray-400" />
              </button>
            </>
          ) : (
            <button onClick={toggleCollapse}>
              <Menu size={18} className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
          {allowedMenus.map(item => {
            const Icon = item.icon;

            if (!item.children) {
              return (
                <Link
                  key={item.key}
                  href={item.href!}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition
                  ${isActive(item.href!)
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
                >
                  <Icon size={18} />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              );
            }

            return (
              <div key={item.key} className="space-y-1">
                <button
                  onClick={() => toggle(item.key)}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    {!isCollapsed && <span>{item.title}</span>}
                  </div>
                  {!isCollapsed && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300
                      ${open[item.key] ? "rotate-0" : "-rotate-90"}`}
                    />
                  )}
                </button>

                {/* Smooth animation */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out
                  ${open[item.key] && !isCollapsed
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"}`}
                >
                  <div className="ml-4 space-y-1 py-1">
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={nestedClass(isActive(child.href))}
                      >
                        {!isCollapsed && child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
