import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { db } from "../../firebase";
import { deleteExpense } from "../../reducers/expenseSlice";
import { deleteIncome } from "../../reducers/incomeSlice";
import AddTransactionModal from "../UI/AddTransactionModal";

export default function TransactionTable({ transactions, type }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dispatch = useDispatch();
  const [isEditingTransaction, setIsEditingTransaction] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, `${type}s`, id));
      if (type === "expense") {
        dispatch(deleteExpense(id));
      } else {
        dispatch(deleteIncome(id));
      }
      toast.success("Transaction deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong " + error.message);
    } finally {
      setActiveDropdown(null);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-x-auto hide-scrollbar">
      <table className="min-w-[800px] w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 text-sm md:text-base text-gray-500 dark:text-gray-300">
            <th className="p-4 text-left font-medium">Date</th>
            <th className="p-4 text-left font-medium">Title</th>
            <th className="p-4 text-left font-medium">Category</th>
            <th className="p-4 text-left font-medium">Notes</th>
            <th className="p-4 text-right font-medium">Amount</th>
            <th className="p-4 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-4 text-center dark:text-white">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-gray-50 dark:hover:bg-slate-700 text-sm md:text-base dark:text-white"
              >
                <td className="p-4">
                  {new Date(transaction.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="p-4">{transaction.title}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs md:text-sm ${
                      type === "expense"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {transaction.category}
                  </span>
                </td>
                <td className="p-4 w-60 dark:text-white">
                  {transaction.notes}
                </td>
                <td
                  className={`p-4 text-right ${
                    type === "expense" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {type === "expense" ? "-" : "+"}₹
                  {Number(transaction.amount).toFixed(2)}
                </td>
                <td className="p-4 text-right relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === transaction.id
                          ? null
                          : transaction.id
                      )
                    }
                    className="p-1 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500 dark:text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>

                  {activeDropdown === transaction.id && (
                    <div className="absolute right-12 -top-4 mt-2 w-20 rounded-md shadow-lg bg-white dark:bg-slate-700 ring-1 ring-black ring-opacity-5 z-10 overflow-hidden">
                      <button
                        onClick={() => {
                          setIsEditingTransaction(transaction);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2 text-sm border-b text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-slate-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {isEditingTransaction && (
        <AddTransactionModal
          isOpen={isEditingTransaction}
          transaction={isEditingTransaction}
          onClose={() => setIsEditingTransaction(null)}
          type={type}
        />
      )}
    </div>
  );
}
