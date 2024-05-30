import { useHistory, Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { setProMember } from '../../store/userSlice';

import { MenuBarIcon, XmarkIcon } from '../../assets/Icons';

export default function Navigation() {
  const loggedIn = useSelector((state) => state.authState.loggedIn);

  const dispatch = useDispatch();

  const history = useHistory();

  return (
    <>
      <nav className="flex justify-between items-center p-5 bg-gray-50 shadow-md fixed w-full top-0  dark:bg-slate-900 dark:text-white">
        <span className=" font-semibold text-2xl">Expense Tracker</span>

        {loggedIn && (
          <div className="flex gap-4">
            <Link
              className="hidden sm:block font-medium border rounded px-2 py-[3px] hover:bg-gray-200 dark:hover:text-black"
              to="/profile"
            >
              Profile
            </Link>
            <Link
              className="hidden sm:block font-medium border rounded px-2 py-[3px] hover:bg-gray-200 dark:hover:text-black"
              to="/expenses"
            >
              Expenses
            </Link>
          </div>
        )}

        {loggedIn ? (
          <button
            className="hidden sm:block  bg-indigo-600 text-white py-1 px-2 rounded-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
            onClick={() => {
              dispatch(logout());
              dispatch(setProMember());
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="hidden sm:block  bg-indigo-600 text-white py-1 px-2 rounded-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
            onClick={() => history.replace('/login')}
          >
            Login
          </button>
        )}

        <button
          className="sm:hidden"
          onClick={() => {
            document.getElementById('hidden').classList.toggle('hidden');
          }}
        >
          <MenuBarIcon />
        </button>
      </nav>

      {/* Navbar for mobile screens */}
      <div
        className="hidden sm:hidden fixed top-0 w-full bg-gray-50 p-5 shadow-md dark:bg-slate-900 dark:text-white"
        id="hidden"
      >
        <div className="flex justify-between items-center">
          <span className=" font-semibold text-2xl">Expense Tracker</span>
          <button
            onClick={() => {
              document.getElementById('hidden').classList.toggle('hidden');
            }}
          >
            <XmarkIcon />
          </button>
        </div>

        {loggedIn && (
          <div className="flex flex-col gap-1 m-2">
            <Link
              className="font-medium rounded p-1 hover:bg-gray-200 dark:hover:text-black"
              to="/profile"
              onClick={() => {
                document.getElementById('hidden').classList.toggle('hidden');
              }}
            >
              Profile
            </Link>
            <Link
              className="font-medium rounded p-1 hover:bg-gray-200 dark:hover:text-black"
              to="/expenses"
              onClick={() => {
                document.getElementById('hidden').classList.toggle('hidden');
              }}
            >
              Expenses
            </Link>
          </div>
        )}

        <div className="mt-2 text-white">
          {loggedIn ? (
            <button
              className="bg-indigo-600 py-1 px-2 rounded-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
              onClick={() => {
                dispatch(logout());
                dispatch(setProMember());
                document.getElementById('hidden').classList.toggle('hidden');
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-indigo-600 py-1 px-2 rounded-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
              onClick={() => {
                history.replace('/login');
                document.getElementById('hidden').classList.toggle('hidden');
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}
