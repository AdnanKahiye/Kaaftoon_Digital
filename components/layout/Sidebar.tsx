"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Settings,
  ChevronDown,
  Menu,
  ClipboardList,
  Users,
  Wallet,
  ArrowRightLeft,
  HandCoins
} from "lucide-react";

type Role = "Administrator" | "Admin" | "Employee" | "User";

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

const MENU_ITEMS = [
  {
    key: "dashboard",
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["Administrator", "Admin", "Employee", "User"] as Role[],
  },
  {
    key: "Registration",
    title: "Registration",
    icon: Settings,
    roles: ["Administrator", "Admin"] as Role[],
    children: [
      { title: "Users", href: "/dashboard/users", roles: ["Administrator", "Admin"] },
      { title: "Category Service", href: "/dashboard/Services", roles: ["Administrator", "Admin"] },
      { title: "Services", href: "/dashboard/Item", roles: ["Administrator", "Admin"] },
      { title: "Expenses Category", href: "/dashboard/Category", roles: ["Administrator", "Admin"] },
    ],
  },
  {
    key: "Sales",
    title: "Sales & CRM",
    icon: Users,
    roles: ["Administrator", "Admin", "User"] as Role[],
    children: [
      { title: "All Customers", href: "/dashboard/Customer", roles: ["Administrator", "Admin", "User"] },
      { title: "Sales Tracking", href: "/dashboard/Sales", roles: ["Administrator", "Admin", "User"] },
      { title: "Contracts", href: "/dashboard/Contract", roles: ["Administrator", "Admin", "User"] },
      { title: "Sales List", href: "/dashboard/Sale", roles: ["Administrator", "Admin", "User"] },
    ],
  },
  {
    key: "Tasks",
    title: "Project Tasks",
    icon: ClipboardList,
    roles: ["Administrator", "Admin", "User", "Employee"] as Role[],
    children: [
      { title: "Task Categories", href: "/dashboard/TaskCategory", roles: ["Administrator", "Admin"] },
      { title: "Task Types", href: "/dashboard/Task-type", roles: ["Administrator", "Admin"] },
      { title: "Main Board", href: "/dashboard/Task", roles: ["Administrator", "Admin", "Employee"] },
      { title: "My Tasks", href: "/dashboard/my-tasks", roles: ["Administrator", "Admin", "Employee", "User"] }
    ],
  },


  {
    key: "Suppliers",
    title: "Suppliers",
    icon: HandCoins,
    roles: ["Administrator", "Admin", "Employee"] as Role[],
    children: [
      { title: "Supplier", href: "/dashboard/Supplier", roles: ["Administrator", "Admin"] },
      { title: "Purchases", href: "/dashboard/Purchase", roles: ["Administrator", "Admin"] },
      { title: "Payments", href: "/dashboard/payment", roles: ["Administrator", "Admin", "Employee"] },
    ],
  },
  {
    key: "billing",
    title: "Finance",
    icon: Wallet,
    roles: ["Administrator", "Admin", "User"] as Role[],
    children: [
      { title: "Payments", href: "/dashboard/unpaid", roles: ["Administrator", "Admin", "User"] },
      { title: "Expenses", href: "/dashboard/Expenses", roles: ["Administrator", "Admin"] },
      { title: "Summary", href: "/dashboard/Summary", roles: ["Administrator", "Admin"] },
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

  // Automatically open the parent menu if a child is active
  useEffect(() => {
    const activeSection = MENU_ITEMS.find((item) =>
      item.children?.some((child) => pathname.startsWith(child.href))
    );
    if (activeSection) {
      setOpen((prev) => ({ ...prev, [activeSection.key]: true }));
    }
  }, [pathname]);

  // Load sidebar state from local storage
  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved) {
      const collapsed = saved === "true";
      setIsCollapsed(collapsed);
      onCollapse?.(collapsed);
    }
  }, [onCollapse]);

  // Logic: Filter top-level menus and ensure children are restricted
  const allowedMenus = MENU_ITEMS.filter((item) => {
    const hasParentRole = role ? item.roles.includes(role) : false;
    
    // If the item has children, only show parent if at least one child is allowed for this role
    if (item.children) {
      const allowedChildren = item.children.filter(child => role && child.roles.includes(role as Role));
      return hasParentRole && allowedChildren.length > 0;
    }
    
    return hasParentRole;
  });

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
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-indigo-600 text-white p-2.5 rounded-xl shadow-lg"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm md:hidden" 
          onClick={() => setIsMobileOpen(false)} 
        />
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

            // Case 1: Simple Link (No Children)
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

            // Case 2: Nested Menu
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
                      {item.children
                        .filter((child) => role ? child.roles.includes(role) : false) // Filter sub-tabs based on role
                        .map((child) => (
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