// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { handleLogout } from "../hooks/useLogout";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-2">
        <div className="bg-green-500 p-2 rounded-full">
          <ShoppingCart className="w-5 h-5 text-white" />
        </div>
          
          <span className="text-xl font-bold text-green-600">Food Kart</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* If no user → show Login */}
          {!user ? (
            <Link
              to="/login"
              className="flex items-center gap-1 text-gray-700 hover:text-green-600"
            >
              <User className="h-5 w-5" />
              <span className="font-medium">Login</span>
            </Link>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-1 text-gray-700 hover:text-green-600"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span className="font-medium">Dashboard</span>
              </Link>

              
              {/* Avatar + Logout */}
              <div className="flex items-center gap-3">
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic || "/fallback.jpg"}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover"
                    onError={(e) => { e.currentTarget.src = "/fallback.jpg"; }}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <button
                  onClick={() => handleLogout(logout, navigate)}
                  className="flex items-center gap-1 text-gray-700 hover:text-red-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-3">
          {!user ? (
            <Link to="/login" className="flex items-center gap-2 text-gray-700 w-full">
              <User className="h-6 w-6" />
              <span>Login</span>
            </Link>
          ) : (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 w-full">
                <LayoutDashboard className="h-6 w-6" />
                <span>Dashboard</span>
              </Link>

              <button className="flex items-center gap-2 text-gray-700 w-full">
                <ShoppingCart className="h-6 w-6" />
                <span>Cart (2)</span>
              </button>

              <button
                onClick={() => handleLogout(logout, navigate)}
                className="flex items-center gap-2 text-gray-700 w-full"
              >
                <LogOut className="h-6 w-6" />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
