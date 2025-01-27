import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

import AddTransactionModal from "../components/UI/AddTransactionModal";
import BudgetOverview from "../components/Dashbord/BudgetOverview";
import RecentTransactions from "../components/Dashbord/RecentTransactions";
import ExpenseCategories from "../components/Dashbord/ExpenseCategories";
import IncomeCategories from "../components/Dashbord/IncomeCategories";

export default function DashboardPage() {
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  return (
    <>
      <BudgetOverview />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentTransactions />

        {/* Expense Categories */}
        <div className="space-y-6">
          <ExpenseCategories />
          <IncomeCategories />
        </div>
      </div>

      {/* Quick Add Button */}
      <button
        onClick={() => setShowAddTransaction(true)}
        className="fixed bottom-20 lg:bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
      >
        <FaPlus className="text-xl" />
      </button>

      <AddTransactionModal
        isOpen={showAddTransaction}
        onClose={() => setShowAddTransaction(false)}
      />
    </>
  );
}
