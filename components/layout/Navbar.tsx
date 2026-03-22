"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AuthService } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";
import {
  LogOut,
  User,
  Search,
  X,
  Bell,
  Settings,
  Menu,
  ChevronDown,
  ShieldCheck,
  CreditCard
} from "lucide-react";

export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const router = useRouter();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "New task assigned to you", time: "5 min ago", read: false, icon: "📋" },
    { id: 2, text: "System maintenance at 12 PM", time: "1 hour ago", read: true, icon: "⚙️" },
    { id: 3, text: "Invoice #4421 Paid", time: "2 hours ago", read: false, icon: "✅" },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await AuthService.logout();
    router.push("/auth/login");
  };

  const markAllAsRead = () => {
    setNotifications(list => list.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 md:px-8 shadow-sm">
      
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-all text-gray-600 active:scale-95"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Dynamic Page Indicator (Optional improvement) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
          <ShieldCheck className="h-4 w-4 text-indigo-600" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">Secured Session</span>
        </div>
      </div>

      {/* SEARCH - CENTER */}
      <div className="hidden sm:flex flex-1 justify-center px-8">
        <div className="relative w-full max-w-lg group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search projects, tasks or invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-sm transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* NOTIFICATIONS */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className={`p-2.5 rounded-xl transition-all relative ${notifOpen ? "bg-indigo-50 text-indigo-600" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2.5 bg-red-500 border-2 border-white w-2.5 h-2.5 rounded-full" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-indigo-100 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
              <div className="p-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <h3 className="font-bold text-gray-900">Notifications</h3>
                <button onClick={markAllAsRead} className="text-xs font-bold text-indigo-600 hover:underline">Mark all read</button>
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div key={n.id} className={`p-4 flex gap-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-0 ${!n.read ? "bg-indigo-50/20" : ""}`}>
                      <span className="text-xl">{n.icon}</span>
                      <div className="flex-1">
                        <p className={`text-sm leading-tight ${!n.read ? "font-bold text-gray-900" : "text-gray-600"}`}>{n.text}</p>
                        <p className="text-[10px] text-gray-400 mt-1 font-medium">{n.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center text-gray-400 text-sm">No new notifications</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-gray-100 mx-1 hidden md:block" />

        {/* PROFILE */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
          >
            <div className="h-9 w-9 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200">
              {user?.email?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="hidden lg:block text-left mr-1">
              <p className="text-xs font-black text-gray-900 leading-none">
                {user?.email?.split('@')[0].toUpperCase()}
              </p>
              <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-tighter">
                {user?.role || "Member"}
              </p>
            </div>
            <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-indigo-100 py-2 animate-in fade-in zoom-in duration-200 origin-top-right">
              <div className="px-4 py-4 border-b border-gray-50 mb-1">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Signed in as</p>
                <p className="text-sm font-bold text-gray-900 truncate">{user?.email}</p>
              </div>

              <div className="px-2 space-y-1">
                <button className="w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-3 transition-colors">
                  <User className="h-4 w-4" /> Profile Details
                </button>
                <button className="w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-3 transition-colors">
                  <Settings className="h-4 w-4" /> Account Settings
                </button>
                <button className="w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-3 transition-colors">
                  <CreditCard className="h-4 w-4" /> Billing & Plans
                </button>
              </div>

              <div className="mt-2 pt-2 border-t border-gray-50 px-2">
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-3 transition-colors font-bold"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}