import { useSelector } from "react-redux";

import SubmitButton from "./SubmitButton";

export default function AddCategoryModal({
  handleSubmit,
  setShowAddModal,
  editingCategory,
  setEditingCategory,
  type,
}) {
  const { loading } = useSelector((state) => state.expenseState);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          {editingCategory ? "Edit Category" : "Add New Category"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-slate-700 dark:text-white"
              defaultValue={editingCategory?.name}
              placeholder="Enter category name"
            />
          </div>
          {!type && (
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                Type
              </label>
              <select
                name="type"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-slate-700 dark:text-white"
                defaultValue={editingCategory?.type || "expense"}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          )}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowAddModal(false);
                setEditingCategory(null);
              }}
              className="px-4 py-2 text-gray-700 text-sm md:text-base hover:bg-gray-100 rounded-md dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <SubmitButton
              isLoading={loading}
              label={editingCategory ? "Save Changes" : "Add Category"}
              loadingLabel="Saving..."
            />
          </div>
        </form>
      </div>
    </div>
  );
}
