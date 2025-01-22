import { useState } from "react";
import { FaPlus, FaSearch, FaFileExport } from "react-icons/fa";
import AddTransactionModal from "../components/AddTransactionModal";

export default function IncomesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

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
    // Add more income items...
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Incomes</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <FaPlus className="mr-2" />
            Add Income
          </button>
          <button className="flex items-center px-4 py-2 text-gray-700 bg-white dark:bg-slate-800 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
            <FaFileExport className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search incomes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-slate-800 rounded-lg"
          />
        </div>
        <div className="flex space-x-4">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-slate-800 rounded-lg"
          >
            <option value="all">All Categories</option>
            <option value="salary">Salary</option>
            <option value="freelance">Freelance</option>
            <option value="investments">Investments</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-slate-800 rounded-lg">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Incomes List */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-500 dark:text-gray-400">
          <div>Date</div>
          <div>Title</div>
          <div>Category</div>
          <div>Notes</div>
          <div className="text-right">Amount</div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {incomes.map((income) => (
            <div
              key={income.id}
              className="grid grid-cols-5 gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              <div>{new Date(income.date).toLocaleDateString()}</div>
              <div>{income.title}</div>
              <div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {income.category}
                </span>
              </div>
              <div className="text-gray-500 dark:text-gray-400 truncate">
                {income.notes}
              </div>
              <div className="text-right text-green-600">
                +${income.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-gray-500 dark:text-gray-400">
          Showing 1-10 of 30 incomes
        </div>
        <div className="flex space-x-2">
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
    </div>
  );
}
