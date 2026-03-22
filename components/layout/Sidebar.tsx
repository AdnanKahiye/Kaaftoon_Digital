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
  ClipboardList,
  Users,
  Wallet,
  ArrowRightLeft
} from "lucide-react";

type Role = "Administrator" | "Manager" | "Employee" | "User";

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

const MENU_ITEMS = [
  {
    key: "dashboard",
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["Administrator", "Manager", "Employee", "User"] as Role[],
  },
  {
    key: "Registration",
    title: "Registration",
    icon: Settings,
    roles: ["Administrator", "Manager"] as Role[],
    children: [
      { title: "Users", href: "/dashboard/users" },
      { title: "Category Service", href: "/dashboard/Services" },
      { title: "Services", href: "/dashboard/Item" },
      { title: "Expenses Category", href: "/dashboard/Category" },
    ],
  },
  {
    key: "Sales",
    title: "Sales & CRM",
    icon: Users,
    roles: ["Administrator", "Manager"] as Role[],
    children: [
      { title: "All Customers", href: "/dashboard/Customer" },
      { title: "Sales Tracking", href: "/dashboard/Sales" },
      { title: "Contracts", href: "/dashboard/Contract" },
      { title: "Sales List", href: "/dashboard/Sale" },
    ],
  },
  {
    key: "Tasks",
    title: "Project Tasks",
    icon: ClipboardList,
    roles: ["Administrator", "Manager"] as Role[],
    children: [
      { title: "Task Categories", href: "/dashboard/TaskCategory" },
      { title: "Task Types", href: "/dashboard/Task-type" },
      { title: "Main Board", href: "/dashboard/Task" },
       { title: "My Tasks", href: "/dashboard/my-tasks" }

    ],
  },
  {
    key: "billing",
    title: "Finance",
    icon: Wallet,
    roles: ["Administrator", "Manager"] as Role[],
    children: [
      { title: "Payments", href: "/dashboard/unpaid" },
      { title: "Expenses", href: "/dashboard/Expenses" },
      { title: "Summary", href: "/dashboard/Summary" },
    ],
  },
];

export default function Sidebar({ onCollapse }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const role = user?.role as Role | undefined;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const activeSection = MENU_ITEMS.find((item) =>
      item.children?.some((child) => pathname.startsWith(child.href))
    );
    if (activeSection) {
      setOpen((prev) => ({ ...prev, [activeSection.key]: true }));
    }
  }, [pathname]);

  const allowedMenus = MENU_ITEMS.filter((item) =>
    role ? item.roles.includes(role) : false
  );

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved) {
      const collapsed = saved === "true";
      setIsCollapsed(collapsed);
      onCollapse?.(collapsed);
    }
  }, [onCollapse]);

  const toggle = (key: string) => {
    if (isCollapsed) return;
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", String(newState));
    onCollapse?.(newState);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-indigo-600 text-white p-2.5 rounded-xl shadow-lg"
      >
        <Menu size={20} />
      </button>

      {isMobileOpen && (
        <div className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-slate-950 border-r border-slate-800 transition-all duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${isCollapsed ? "w-[80px]" : "w-[260px]"}`}
      >
        {/* LOGO AREA */}
        <div className={`flex h-20 items-center px-6 border-b border-slate-800/50 ${isCollapsed ? "justify-center" : "justify-between"}`}>
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl shadow-indigo-500/20 shadow-lg text-white font-bold text-xl">
                S
              </div>
              <span className="text-slate-100 font-bold tracking-tight text-lg">CORE SYSTEM</span>
            </div>
          ) : (
            <div className="h-10 w-10 flex items-center justify-center bg-indigo-600 rounded-xl text-white font-bold">S</div>
          )}
        </div>

        {/* NAV LIST */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1.5">
          {allowedMenus.map((item) => {
            const Icon = item.icon;
            const isParentActive = item.children?.some(child => isActive(child.href));

            if (!item.children) {
              return (
                <Link
                  key={item.key}
                  href={item.href!}
                  className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
                  ${isActive(item.href!) 
                    ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm" 
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-100 border border-transparent"}`}
                >
                  <Icon size={20} className={isActive(item.href!) ? "text-indigo-400" : "group-hover:text-slate-100"} />
                  {!isCollapsed && <span>{item.title}</span>}
                  {isActive(item.href!) && !isCollapsed && (
                    <div className="absolute left-0 w-1 h-5 bg-indigo-500 rounded-r-full" />
                  )}
                </Link>
              );
            }

            return (
              <div key={item.key} className="space-y-1">
                <button
                  onClick={() => toggle(item.key)}
                  className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all
                  ${isParentActive && !open[item.key] ? "text-indigo-400 bg-indigo-600/5" : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className={isParentActive ? "text-indigo-400" : "group-hover:text-slate-100"} />
                    {!isCollapsed && <span>{item.title}</span>}
                  </div>
                  {!isCollapsed && (
                    <ChevronDown size={16} className={`transition-transform duration-300 ${open[item.key] ? "rotate-180" : "rotate-0"}`} />
                  )}
                </button>

                {!isCollapsed && (
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open[item.key] ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="ml-9 mt-1 space-y-1 border-l border-slate-800">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`relative block py-2 pl-6 pr-4 text-xs font-medium transition-colors
                          ${isActive(child.href) 
                            ? "text-indigo-400 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-indigo-500 before:rounded-full" 
                            : "text-slate-500 hover:text-slate-200"}`}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* FOOTER - COLLAPSE TOGGLE */}
        <div className="p-4 border-t border-slate-800/50">
          <button
            onClick={toggleCollapse}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition-all"
          >
            <ArrowRightLeft size={18} className={`transition-transform duration-500 ${isCollapsed ? "rotate-180" : "rotate-0"}`} />
            {!isCollapsed && <span>Collapse Sidebar</span>}
          </button>
        </div>
      </aside>
    </>
  );
}