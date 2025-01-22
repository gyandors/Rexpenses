import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function CategoriesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Placeholder data - replace with your actual data
  const categories = {
    expense: [
      { id: 1, name: "Food", type: "expense", count: 45, total: 2500 },
      {
        id: 2,
        name: "Transportation",
        type: "expense",
        count: 30,
        total: 1200,
      },
      { id: 3, name: "Entertainment", type: "expense", count: 15, total: 800 },
    ],
    income: [
      { id: 4, name: "Salary", type: "income", count: 12, total: 60000 },
      { id: 5, name: "Freelance", type: "income", count: 8, total: 4000 },
      { id: 6, name: "Investments", type: "income", count: 4, total: 2000 },
    ],
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FaPlus className="mr-2" />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expense Categories */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold">Expense Categories</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {categories.expense.map((category) => (
              <div
                key={category.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category.count} transactions · $
                    {category.total.toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    <FaEdit />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Income Categories */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold">Income Categories</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {categories.income.map((category) => (
              <div
                key={category.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category.count} transactions · $
                    {category.total.toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    <FaEdit />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      {(showAddModal || editingCategory) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-slate-700"
                  defaultValue={editingCategory?.name}
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-slate-700"
                  defaultValue={editingCategory?.type || "expense"}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingCategory ? "Save Changes" : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
