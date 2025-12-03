import React, { useContext } from "react";
import { webData } from "../context/UserContext";
import { Link, Navigate } from "react-router-dom";
import { logout } from "../utils/Api";

const Dashboard = () => {
  const { user, setUser } = useContext(webData);

  const handleLogout = async () => {
    await logout();
    setUser(null); // Clear user from context
    Navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-black text-blue-100 p-6">

      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-green-300/60">
        <h1 className="font-semibold text-xl tracking-tight text-blue-100">
          My Dashboard
        </h1>

        <div className="flex items-center gap-6">
          <Link className="hover:text-green-300 transition" to="/">Home</Link>
          <Link className="hover:text-green-300 transition" to="/notes">Notes</Link>
          <Link className="hover:text-green-300 transition" to="/profile">Profile</Link>
          
          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="hover:text-green-400 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto mt-10 bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-green-400/50">

        <h2 className="text-3xl font-bold text-blue-200">
          Welcome, {user?.name || "User"} 👋
        </h2>

        <p className="text-blue-300 mt-2">
          Here is your clean and minimal dashboard.
        </p>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">

          <div className="p-6 bg-black/30 border border-green-300/40 rounded-xl hover:border-green-300 transition">
            <h3 className="font-semibold text-blue-200">My Notes</h3>
            <p className="text-sm text-blue-300 mt-2">View & manage your notes.</p>
          </div>

          <div className="p-6 bg-black/30 border border-green-300/40 rounded-xl hover:border-green-300 transition">
            <h3 className="font-semibold text-blue-200">Profile Settings</h3>
            <p className="text-sm text-blue-300 mt-2">Update your profile info.</p>
          </div>

          <div className="p-6 bg-black/30 border border-green-300/40 rounded-xl hover:border-green-300 transition">
            <h3 className="font-semibold text-blue-200">Activity</h3>
            <p className="text-sm text-blue-300 mt-2">Track your recent activity.</p>
          </div>

          <div
            onClick={handleLogout}
            className="p-6 cursor-pointer bg-black/30 border border-green-300/40 rounded-xl hover:border-red-400 hover:text-red-300 transition"
          >
            <h3 className="font-semibold">Logout</h3>
            <p className="text-sm text-blue-300 mt-2">Sign out from your account.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
