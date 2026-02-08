"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AuthService } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User, Search, X, Bell, Settings } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New user registered", time: "5 min ago", read: false },
    { id: 2, text: "System update completed", time: "1 hour ago", read: true },
    { id: 3, text: "Payment received", time: "2 hours ago", read: false },
  ]);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement your search logic here
      console.log("Searching for:", searchQuery);
      // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-50 h-16 bg-gray-900 text-white flex items-center justify-between px-6 shadow-lg border-b border-gray-800">
      {/* ===== LEFT SECTION ===== */}
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold text-white tracking-wider hidden md:block">
          Dashboard
        </h1>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-md hover:bg-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* ===== CENTER SECTION - SEARCH ===== */}
      <div className="flex-1 max-w-2xl mx-4">
        {searchOpen ? (
          <div className="relative">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users, reports, analytics..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="ml-2 p-2 rounded-md hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center w-full max-w-md mx-auto px-4 py-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition duration-200"
          >
            <Search className="h-5 w-5 mr-3" />
            <span className="text-sm">Search...</span>
            <div className="ml-auto text-xs px-2 py-1 bg-gray-700 rounded">
              ⌘K
            </div>
          </button>
        )}
      </div>

      {/* ===== RIGHT SECTION ===== */}
      <div className="flex items-center gap-4">
        {/* Mobile Search Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="md:hidden p-2 rounded-md hover:bg-gray-800"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <div className="relative group">
          <button className="p-2 rounded-md hover:bg-gray-800 relative">
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>
          
          {/* Notifications Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-700 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold">Notifications</h3>
              {unreadNotifications > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-indigo-400 hover:text-indigo-300"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-700 hover:bg-gray-750 cursor-pointer ${
                    !notification.read ? "bg-gray-750" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm">{notification.text}</p>
                    {!notification.read && (
                      <div className="h-2 w-2 bg-blue-500 rounded-full mt-1"></div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {notification.time}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-3 text-center border-t border-gray-700">
              <button className="text-sm text-indigo-400 hover:text-indigo-300">
                View all notifications
              </button>
            </div>
          </div>
        </div>

        {/* Settings */}
        <button className="p-2 rounded-md hover:bg-gray-800">
          <Settings className="h-5 w-5" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {user?.email?.charAt(0).toUpperCase() ?? "U"}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-semibold">{user?.email ?? "User"}</span>
              <span className="text-xs text-gray-400">{user?.role ?? "User"}</span>
            </div>
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {user?.email?.charAt(0).toUpperCase() ?? "U"}
                </div>
                <div>
                  <p className="font-semibold text-sm">{user?.email ?? "User"}</p>
                  <p className="text-xs text-gray-400">{user?.role ?? "User"}</p>
                </div>
              </div>
            </div>
            
            <div className="py-2">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-750 flex items-center gap-3">
                <User className="h-4 w-4" />
                Profile Settings
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-750 flex items-center gap-3">
                <Settings className="h-4 w-4" />
                Account Settings
              </button>
            </div>
            
            <div className="border-t border-gray-700 py-2">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-750 text-red-400 hover:text-red-300 flex items-center gap-3"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}