"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  LayoutDashboard,
  List,
  Wallet,
  User,
  Settings,
  LogOut,
  Sun,
  Moon,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Tasks", icon: List, path: "/dashboard/tasks" },
  { name: "Expenses", icon: Wallet, path: "/dashboard/expenses" },
  { name: "Profile", icon: User, path: "/dashboard/profile" },
  { name: "Settings", icon: Settings, path: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`relative flex flex-col border-r bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg transition-all ${isCollapsed ? "w-20" : "w-64"}`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b dark:border-gray-700">
          {!isCollapsed && <h1 className="text-lg font-bold dark:text-white">Dashboard</h1>}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
            {isCollapsed ? <ChevronRight className="h-5 w-5 dark:text-white" /> : <ChevronLeft className="h-5 w-5 dark:text-white" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow p-2">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path} className="flex items-center gap-x-4 p-3 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              <item.icon className="h-6 w-6 dark:text-white" />
              {!isCollapsed && <span className="dark:text-white">{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 flex flex-col gap-4">
          {/* Dark Mode Toggle */}
          <button onClick={() => setDarkMode(!darkMode)} className="flex items-center justify-center p-3 rounded-lg bg-gray-200 dark:bg-gray-700 transition-all">
            {darkMode ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-gray-900 dark:text-gray-100" />}
          </button>

          {/* Logout */}
          <button onClick={handleLogout} className="flex items-center gap-x-3 p-3 text-white bg-red-600 rounded-lg hover:bg-red-700">
            <LogOut className="h-6 w-6" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        {children}
      </main>
    </div>
  );
}
