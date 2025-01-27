import { FaFileExport, FaPlus } from "react-icons/fa";

export default function TransactionsHeader({ title, type, setShowAddModal }) {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 my-6">
      <h1 className="text-xl md:text-2xl font-bold dark:text-white">{title}</h1>
      <div className="flex space-x-3">
        <button
          onClick={() => setShowAddModal(true)}
          className={`flex items-center px-4 py-2 text-sm md:text-base text-white rounded-lg transition-colors ${
            type === "income"
              ? "bg-green-600 hover:bg-green-500"
              : "bg-red-600 hover:bg-red-500"
          }`}
        >
          <FaPlus className="mr-2" />
          Add {type}
        </button>
        <button className="flex items-center px-4 py-2 text-sm md:text-base text-gray-700 bg-white dark:bg-slate-800 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
          <FaFileExport className="mr-2" />
          Export
        </button>
      </div>
    </div>
  );
}
