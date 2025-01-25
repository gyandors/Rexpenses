import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import AddTransactionModal from "../components/UI/AddTransactionModal";
import TransactionTable from "../components/Transactions/TransactionTable";
import TransactionsHeader from "../components/Transactions/TransactionsHeader";
import { useSelector } from "react-redux";

export default function IncomesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const { categories } = useSelector((state) => state.expenseState);

  // Placeholder data - replace with your actual data
  const incomes = [
    {
      id: 1,
      title: "Monthly Salary",
      amount: 5000.0,
      category: "Salary",
      date: "2024-03-01",
      notes: "March salary",
    },
    {
      id: 2,
      title: "Freelance Project",
      amount: 750.0,
      category: "Freelance",
      date: "2024-03-10",
      notes: "Website development",
    },
  ];

  const filteredIncomeCategories = categories.filter(
    (category) => category.type === "income"
  );

  return (
    <>
      <TransactionsHeader
        title="Incomes"
        type="income"
        setShowAddModal={setShowAddModal}
      />

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 dark:text-white">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search incomes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 dark:border-gray-600 dark:bg-slate-800"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 dark:border-gray-600 dark:bg-slate-800"
          >
            <option value="all">All Categories</option>
            {filteredIncomeCategories.map((category) => (
              <option key={category.id} value={category.name.toLowerCase()}>
                {category.name}
              </option>
            ))}
          </select>
          <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 dark:border-gray-600 dark:bg-slate-800">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Incomes List */}
      <TransactionTable transactions={incomes} type="income" />

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-gray-500 dark:text-gray-400">
          Showing 1-10 of 50 incomes
        </div>
        <div className="flex space-x-2 dark:text-gray-300">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
            Next
          </button>
        </div>
      </div>

      {/* Add Income Modal */}
      <AddTransactionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        type="income"
      />
    </>
  );
}
