import { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";

export default function AddTransactionModal({
  isOpen,
  onClose,
  type = "expense",
}) {
  const [activeTab, setActiveTab] = useState(type);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // Placeholder for custom categories - replace with your state management
  const [customExpenseCategories, setCustomExpenseCategories] = useState([]);
  const [customIncomeCategories, setCustomIncomeCategories] = useState([]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    if (activeTab === "expense") {
      setCustomExpenseCategories([
        ...customExpenseCategories,
        newCategory.trim(),
      ]);
    } else {
      setCustomIncomeCategories([
        ...customIncomeCategories,
        newCategory.trim(),
      ]);
    }

    setNewCategory("");
    setShowAddCategory(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    onClose();
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FaTimes />
          </button>

          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              className={`pb-2 px-1 font-medium text-sm ${
                activeTab === "expense"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("expense")}
            >
              Add Expense
            </button>
            <button
              className={`pb-2 px-1 font-medium text-sm ${
                activeTab === "income"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("income")}
            >
              Add Income
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-slate-900 px-3 py-2"
                placeholder={`${
                  activeTab === "expense" ? "Expense" : "Income"
                } title`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-slate-900 pl-7 pr-3 py-2"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-slate-900 px-3 py-2"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium">Category</label>
                <button
                  type="button"
                  onClick={() => setShowAddCategory(true)}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 text-sm flex items-center"
                >
                  <FaPlus className="mr-1" size={12} />
                  Add Category
                </button>
              </div>
              <select
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-slate-900 px-3 py-2"
                required
              >
                <option value="">Select category</option>
                {activeTab === "expense" ? (
                  <>
                    <option value="food">Food</option>
                    <option value="transportation">Transportation</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="utilities">Utilities</option>
                    <option value="shopping">Shopping</option>
                    {customExpenseCategories.map((category, index) => (
                      <option key={index} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                    <option value="other">Other</option>
                  </>
                ) : (
                  <>
                    <option value="salary">Salary</option>
                    <option value="freelance">Freelance</option>
                    <option value="investments">Investments</option>
                    {customIncomeCategories.map((category, index) => (
                      <option key={index} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                    <option value="other">Other</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Notes (Optional)
              </label>
              <textarea
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-slate-900 px-3 py-2"
                rows="3"
                placeholder="Add any additional notes..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                  activeTab === "expense"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {activeTab === "expense" ? "Add Expense" : "Add Income"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-medium mb-4">Add New Category</h3>
            <form onSubmit={handleAddCategory}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-slate-900 px-3 py-2"
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddCategory(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
