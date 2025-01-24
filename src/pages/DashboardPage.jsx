import { useState } from "react";
import { FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa6";
import AddTransactionModal from "../components/UI/AddTransactionModal";

export default function DashboardPage() {
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  // Placeholder data - replace with actual data from your state management
  const totalExpenses = 2547.63;
  const monthlyBudget = 3000;
  const recentTransactions = [
    {
      id: 1,
      title: "Grocery Shopping",
      amount: 156.32,
      category: "Food",
      date: "2024-03-15",
    },
    {
      id: 2,
      title: "Netflix Subscription",
      amount: 15.99,
      category: "Entertainment",
      date: "2024-03-14",
    },
    {
      id: 3,
      title: "Gas Station",
      amount: 45.0,
      category: "Transportation",
      date: "2024-03-13",
    },
  ];

  return (
    <>
      {/* Top Stats */}
      <h1 className="my-6 text-2xl font-bold">Welcome Back, Sachin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Total Expenses
          </h3>
          <p className="text-2xl font-bold mt-2">${totalExpenses.toFixed(2)}</p>
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

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Monthly Budget
          </h3>
          <p className="text-2xl font-bold mt-2">${monthlyBudget.toFixed(2)}</p>
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

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Remaining Budget
          </h3>
          <p className="text-2xl font-bold mt-2">
            ${Math.max(monthlyBudget - totalExpenses, 0).toFixed(2)}
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-6 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium">{transaction.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {transaction.category} •{" "}
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="font-semibold">
                    ${transaction.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expense Categories */}
        <div>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Expense Categories</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Food</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>
                <span className="font-medium">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Transportation</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: "30%" }}
                    ></div>
                  </div>
                </div>
                <span className="font-medium">30%</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Entertainment</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-purple-500 h-2.5 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>
                <span className="font-medium">25%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Add Button */}
      <button
        onClick={() => setShowAddTransaction(true)}
        className="fixed bottom-20 lg:bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
      >
        <FaPlus className="text-xl" />
      </button>

      {/* Replace the old modal with the new component */}
      <AddTransactionModal
        isOpen={showAddTransaction}
        onClose={() => setShowAddTransaction(false)}
      />
    </>
  );
}
