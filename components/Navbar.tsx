"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My CRUD App</h1>
        <div className="space-x-6">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/courses" className="hover:underline">Courses</Link>
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-white text-blue-600 px-3 py-1 rounded-lg hover:bg-gray-100"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
