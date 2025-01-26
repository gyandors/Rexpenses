import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import AddTransactionModal from "../components/UI/AddTransactionModal";
import TransactionTable from "../components/Transactions/TransactionTable";
import TransactionsHeader from "../components/Transactions/TransactionsHeader";
import { useSelector } from "react-redux";
import { filterCategories } from "../utils/utilities";

export default function ExpensesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  const { categories } = useSelector((state) => state.categoryState);
  const { expenses } = useSelector((state) => state.expenseState);

  const expenseCategories = filterCategories(categories, "expense");

  // Filter, search, and sort logic
  const filteredExpenses = expenses
    .filter((expense) => {
      const matchesSearchQuery = expense.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedFilter === "all" ||
        expense.category.toLowerCase() === selectedFilter;

      return matchesSearchQuery && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "highest":
          return b.amount - a.amount;
        case "lowest":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

  return (
    <>
      <TransactionsHeader
        title="Expenses"
        type="expense"
        setShowAddModal={setShowAddModal}
      />

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 dark:text-white">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search expenses..."
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
            {expenseCategories.map((category) => (
              <option key={category.id} value={category.name.toLowerCase()}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 dark:border-gray-600 dark:bg-slate-800"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Expenses List */}
      <TransactionTable transactions={filteredExpenses} type="expense" />

      {/* Pagination */}
      {/* <div className="flex justify-between items-center mt-6">
        <div className="text-gray-500 dark:text-gray-400">
          Showing 1-10 of 50 expenses
        </div>
        <div className="flex space-x-2 dark:text-gray-300">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
            Next
          </button>
        </div>
      </div> */}

      {/* Add Expense Modal */}
      <AddTransactionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        type="expense"
      />
    </>
  );
}
