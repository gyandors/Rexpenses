import { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

import menuBars from '../../assets/menuBars.svg';
import xMark from '../../assets/xMark.svg';

import AuthContext from '../../context/AuthContext';

export default function Navigation() {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  return (
    <>
      <nav className="flex justify-between items-center p-5 bg-gray-50 shadow-md fixed w-full top-0">
        <span className=" font-semibold text-2xl">Expense Tracker</span>

        {authCtx.loggedIn && (
          <div className="flex gap-4">
            <Link
              className="hidden sm:block font-medium border rounded px-2 py-[3px] hover:bg-gray-200"
              to="/profile"
            >
              Profile
            </Link>
            <Link
              className="hidden sm:block font-medium border rounded px-2 py-[3px] hover:bg-gray-200"
              to="/expenses"
            >
              Expenses
            </Link>
          </div>
        )}

        {authCtx.loggedIn ? (
          <button
            className="hidden sm:block  bg-indigo-600 text-white py-1 px-2 rounded-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
            onClick={() => authCtx.logout()}
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
          <img src={menuBars} width={20} alt="menu" />
        </button>
      </nav>

      {/* Navbar for mobile screens */}
      <div
        className="hidden sm:hidden fixed top-0 w-full bg-gray-50 p-5 shadow-md"
        id="hidden"
      >
        <div className="flex justify-between items-center">
          <span className=" font-semibold text-2xl">Expense Tracker</span>
          <button
            onClick={() => {
              document.getElementById('hidden').classList.toggle('hidden');
            }}
          >
            <img src={xMark} width={20} alt="menu" />
          </button>
        </div>

        {authCtx.loggedIn && (
          <div className="flex flex-col gap-1 m-2">
            <Link
              className="font-medium rounded p-1 hover:bg-gray-200"
              to="/profile"
              onClick={() => {
                document.getElementById('hidden').classList.toggle('hidden');
              }}
            >
              Profile
            </Link>
            <Link
              className="font-medium rounded p-1 hover:bg-gray-200"
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
          {authCtx.loggedIn ? (
            <button
              className="bg-indigo-600 py-1 px-2 rounded-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
              onClick={() => {
                authCtx.logout();
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
