import { useRef, useState } from "react";
import { FaArrowDown, FaArrowUp, FaPencil, FaSpinner } from "react-icons/fa6";
import { FaCalendarDay, FaSave } from "react-icons/fa";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import useAuthContext from "../../context/AuthContext";
import { auth, db } from "../../firebase";

export default function BudgetOverview({ currentDate, setCurrentDate }) {
  const [showEditBudget, setShowEditBudget] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { expenses } = useSelector((state) => state.expenseState);
  const {
    budget: monthlyBudget,
    setBudget,
    isLoading,
    setIsLoading,
    user,
  } = useAuthContext();
  const budgetRef = useRef(monthlyBudget);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Filter expenses for current month and calculate total
  const totalExpenses = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    })
    .reduce((total, expense) => total + Number(expense.amount), 0);

  const handleSaveBudget = async () => {
    setIsLoading(true);
    try {
      await setDoc(doc(db, "budget", auth.currentUser.uid), {
        budget: budgetRef.current.value,
      });

      setBudget(Number(budgetRef.current.value));
    } catch (error) {
      console.error(error);
      toast.error("Failed to save budget " + error.message);
    } finally {
      setShowEditBudget(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="my-6 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold dark:text-white">
          Hi, {user.displayName}
        </h1>
        <div className="relative">
          <button
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <span className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
              {currentDate.toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric",
              })}
            </span>
            <FaCalendarDay className="text-lg" />
          </button>
          {showDatePicker && (
            <input
              type="month"
              className="absolute top-8 right-0 px-2 py-1 border rounded-md bg-white dark:bg-slate-800 dark:text-white dark:border-gray-700"
              value={`${currentYear}-${String(currentMonth + 1).padStart(
                2,
                "0"
              )}`}
              onChange={(e) => {
                const [year, month] = e.target.value.split("-");
                const newDate = new Date(currentDate);
                newDate.setMonth(parseInt(month) - 1);
                newDate.setFullYear(parseInt(year));
                setCurrentDate(newDate);
                setShowDatePicker(false);
              }}
            />
          )}
        </div>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Monthly Budget */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Monthly Budget
            </h3>
            {showEditBudget ? (
              <button
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                onClick={handleSaveBudget}
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaSave />
                )}
              </button>
            ) : (
              <button
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                onClick={() => setShowEditBudget(true)}
              >
                <FaPencil className="text-sm" />
              </button>
            )}
          </div>
          {showEditBudget ? (
            <input
              type="number"
              defaultValue={monthlyBudget}
              className="text-2xl font-bold mt-2 w-1/2 px-1 border-b border-gray-300 focus:outline-none focus:rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:bg-transparent dark:text-gray-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              ref={budgetRef}
            />
          ) : (
            <p className="text-2xl font-bold mt-2 dark:text-gray-300">
              ₹{monthlyBudget.toFixed(2)}
            </p>
          )}
          <div className="mt-2 h-2 bg-gray-200 rounded-full">
            <div
              className={`h-2 rounded-full ${
                totalExpenses > monthlyBudget ? "bg-red-500" : "bg-green-500"
              }`}
              style={{
                width: `${Math.min(
                  (totalExpenses / monthlyBudget) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Total Expenses
          </h3>
          <p className="text-2xl font-bold mt-2 dark:text-gray-300">
            ₹{totalExpenses.toFixed(2)}
          </p>
          <div className="mt-2 text-sm">
            <span
              className={`${
                totalExpenses > monthlyBudget
                  ? "text-red-500"
                  : "text-green-500"
              } flex items-center`}
            >
              {totalExpenses > monthlyBudget ? (
                <FaArrowUp className="mr-1" />
              ) : (
                <FaArrowDown className="mr-1" />
              )}
              {Math.abs(
                ((totalExpenses - monthlyBudget) / monthlyBudget) * 100
              ).toFixed(1)}
              % from budget
            </span>
          </div>
        </div>

        {/* Remaining Budget */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Remaining Budget
          </h3>
          <p className="text-2xl font-bold mt-2 dark:text-gray-300">
            ₹{Math.max(monthlyBudget - totalExpenses, 0).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {Math.max(
              ((monthlyBudget - totalExpenses) / monthlyBudget) * 100,
              0
            ).toFixed(1)}
            % remaining
          </p>
        </div>
      </div>
    </>
  );
}
