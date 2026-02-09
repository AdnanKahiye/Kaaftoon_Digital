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
} from "lucide-react";

export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const router = useRouter();
  const { user } = useAuth();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "New user registered", time: "5 min ago", read: false },
    { id: 2, text: "System update completed", time: "1 hour ago", read: true },
    { id: 3, text: "Payment received", time: "2 hours ago", read: false },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setProfileOpen(false);
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
    <header className="sticky top-0 z-40 h-16 bg-gray-900 border-b border-gray-800 flex items-center px-4 md:px-6">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-md hover:bg-gray-800"
        >
          <Menu className="h-5 w-5 text-white" />
        </button>

        <h1 className="hidden md:block text-xl font-semibold text-white">
          Dashboard
        </h1>
      </div>

      {/* CENTER SEARCH */}
      <div className="flex-1 flex justify-center px-4">
        {searchOpen ? (
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button
              onClick={() => {
                setSearchQuery("");
                setSearchOpen(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-400 hover:bg-gray-700"
          >
            <Search className="h-4 w-4" />
            Search…
          </button>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        {/* MOBILE SEARCH */}
        <button
          onClick={() => setSearchOpen(true)}
          className="md:hidden p-2 rounded-md hover:bg-gray-800"
        >
          <Search className="h-5 w-5 text-white" />
        </button>

        {/* NOTIFICATIONS */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen(v => !v)}
            className="p-2 rounded-md hover:bg-gray-800 relative"
          >
            <Bell className="h-5 w-5 text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white h-4 w-4 text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-gray-200 flex justify-between">
                <span className="font-semibold text-gray-900">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Mark all
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    className={`p-4 text-sm border-b border-gray-100 ${
                      !n.read ? "bg-gray-50" : ""
                    }`}
                  >
                    <p className="text-gray-800">{n.text}</p>
                    <span className="text-xs text-gray-500">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* USER PROFILE */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(v => !v)}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800"
          >
            <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              {user?.email?.[0]?.toUpperCase() ?? "U"}
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {/* HEADER */}
              <div className="p-4 border-b border-gray-200">
                <p className="font-semibold text-sm text-gray-900">
                  {user?.email ?? "User"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role ?? "User"}
                </p>
              </div>

              {/* MENU */}
              <div className="py-2">
                <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  Profile
                </button>

                <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <Settings className="h-4 w-4 text-gray-500" />
                  Settings
                </button>
              </div>

              {/* LOGOUT */}
              <div className="border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
