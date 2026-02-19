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
} from "lucide-react";
import Image from "next/image";

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
    { 
      id: 1, 
      text: "New user registered", 
      time: "5 min ago", 
      read: false,
      icon: "👤"
    },
    { 
      id: 2, 
      text: "System update completed", 
      time: "1 hour ago", 
      read: true,
      icon: "🔄"
    },
    { 
      id: 3, 
      text: "Payment received", 
      time: "2 hours ago", 
      read: false,
      icon: "💰"
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
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
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-gray-200 flex items-center px-4 md:px-6 shadow-sm">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Logo/Brand */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <span className="hidden md:block text-lg font-semibold text-gray-900">
            Dashboard
          </span>
        </div>
      </div>

      {/* SEARCH - CENTER */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3">
        {/* NOTIFICATIONS */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    You have {unreadCount} unread messages
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${
                      !notification.read ? "bg-indigo-50/30" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                        {notification.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${
                          !notification.read ? "font-medium text-gray-900" : "text-gray-600"
                        }`}>
                          {notification.text}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* PROFILE DROPDOWN */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {user?.email?.[0]?.toUpperCase() ?? "U"}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user?.email?.split('@')[0] ?? "User"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email ?? "user@example.com"}
                </p>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
              profileOpen ? "rotate-180" : ""
            }`} />
          </button>

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-gray-200 shadow-lg py-2">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {user?.email?.split('@')[0] ?? "User"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {user?.email ?? "user@example.com"}
                </p>
              </div>

              <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                Profile Settings
              </button>

              <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Settings className="h-4 w-4 text-gray-500" />
                Account Settings
              </button>

              <div className="border-t border-gray-100 my-2"></div>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}