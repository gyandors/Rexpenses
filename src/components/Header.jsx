import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

import useAuthContext from "../context/AuthContext";
import { auth } from "../firebase";
import DarkMode from "./UI/DarkMode";

export default function Header() {
  const { logout, loggedIn } = useAuthContext();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (showLogoutConfirm) {
      setIsAnimating(true);
    }
  }, [showLogoutConfirm]);

  const handleCloseModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setShowLogoutConfirm(false);
    }, 200);
  };

  async function handleLogout() {
    try {
      await signOut(auth);
      logout();
      setShowLogoutConfirm(false);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to log out!");
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="flex justify-between items-center px-4 lg:px-8 h-20 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Budget Buddy Logo" className="w-8 h-8" />
            <span className="hidden md:block font-semibold text-xl ml-2 text-gray-900 dark:text-white">
              Budget Buddy
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-1 text-sm md:text-base">
          <DarkMode />
          {loggedIn ? (
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
            >
              <FiLogOut className="text-gray-500 dark:text-gray-400 size-5" />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
            >
              <FiLogIn className="text-gray-500 dark:text-gray-400 size-5" />
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ease-in-out
            ${isAnimating ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={handleCloseModal}
          ></div>
          <div
            className={`bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 relative
              transition-all duration-200 ease-in-out
              ${
                isAnimating
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
          >
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Confirm Logout
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
