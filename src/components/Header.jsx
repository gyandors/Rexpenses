import { Link } from "react-router-dom";
import { FiLogOut, FiLogIn } from "react-icons/fi";

import useAuthContext from "../context/AuthContext";

export default function Header() {
  const { logout, loggedIn } = useAuthContext();

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

        {loggedIn ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => logout()}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
            >
              <FiLogOut className="text-gray-500 dark:text-gray-400 size-5" />
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
          >
            <FiLogIn className="text-gray-500 dark:text-gray-400 size-5" />
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
