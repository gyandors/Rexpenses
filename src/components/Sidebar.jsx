import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaChartLine,
  FaMoneyBillTrendUp,
  FaMoneyBillTransfer,
  FaListUl,
} from "react-icons/fa6";

const navLinks = [
  { path: "/dashboard", icon: FaChartLine, label: "Dashboard" },
  { path: "/incomes", icon: FaMoneyBillTrendUp, label: "Incomes" },
  { path: "/expenses", icon: FaMoneyBillTransfer, label: "Expenses" },
  { path: "/categories", icon: FaListUl, label: "Categories" },
  { path: "/profile", icon: FaUser, label: "Profile" },
];

export default function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-800 shadow-sm pt-20">
        <div className="px-4 py-6">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-700"
                  activeClassName="bg-blue-50 text-blue-600 dark:bg-slate-700 dark:text-blue-400"
                  exact
                >
                  <Icon className="mr-3 text-lg" />
                  {link.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="flex justify-around items-center">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className="flex flex-col items-center py-3 px-2 text-gray-700 dark:text-gray-300"
                activeClassName="text-blue-600 dark:text-blue-400"
                exact
              >
                <Icon className="text-xl mb-1" />
                <span className="text-xs">{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
