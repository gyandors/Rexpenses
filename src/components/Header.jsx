import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../store/authSlice";
import { setProMember } from "../store/userSlice";

export default function Header() {
  const loggedIn = useSelector((state) => state.authState.loggedIn);
  const dispatch = useDispatch();

  return (
    <header>
      <nav className="flex justify-between items-center p-5 bg-gray-50 shadow-md fixed z-50 w-full top-0 dark:bg-slate-900 dark:text-white">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Budget Buddy Logo"
              className="w-10 h-10"
            />
          </Link>
          <span className="font-semibold text-xl md:text-2xl">
            Budget Buddy
          </span>
        </div>

        {loggedIn ? (
          <button
            className="bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 "
            onClick={() => {
              dispatch(logout());
              dispatch(setProMember());
            }}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 "
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
