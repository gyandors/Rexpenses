import { FaEdit, FaTrash } from "react-icons/fa";

export default function IncomeCategories({
  filteredIncomeCategories,
  setEditingCategory,
  handleDeleteCategory,
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold dark:text-white">
          Income Categories
        </h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {filteredIncomeCategories.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 p-4">
            No income categories found
          </p>
        )}

        {filteredIncomeCategories.map((category) => (
          <div
            key={category.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            <div>
              <h3 className="font-medium dark:text-gray-200">
                {category.name}
              </h3>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingCategory(category)}
                className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
