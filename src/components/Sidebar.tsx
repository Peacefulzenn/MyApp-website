"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Tasks", path: "/tasks" },
  { name: "Expenses", path: "/expenses" }, // Added Expenses

  { name: "Expenses", path: "/expenses" }, // Added Expenses
  { name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6">App Name</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path} className={`p-2 rounded ${pathname === item.path ? "bg-gray-700" : ""}`}>
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
