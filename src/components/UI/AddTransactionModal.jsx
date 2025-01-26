import { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import AddCategoryModal from "./AddCategoryModal";
import SubmitButton from "./SubmitButton";
import { auth, db } from "../../firebase";
import { addCategory, setLoading } from "../../reducers/categorySlice";
import { filterCategories } from "../../utils/utilities";
import { addExpense } from "../../reducers/expenseSlice";
import { addIncome } from "../../reducers/incomeSlice";

export default function AddTransactionModal({
  isOpen,
  onClose,
  type = "expense",
}) {
  const [activeTab, setActiveTab] = useState(type);
  const [showAddCategory, setShowAddCategory] = useState(false);

  const { loading, categories } = useSelector((state) => state.categoryState);
  const dispatch = useDispatch();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (e.target.name.value.trim() === "") {
      toast.error("Category name is required");
      return;
    }

    dispatch(setLoading(true));
    try {
      const category = {
        name: e.target.name.value,
        type: activeTab,
        createdAt: Date.now().toString(),
        userId: auth.currentUser?.uid,
      };

      const docRef = await addDoc(collection(db, "categories"), category);
      dispatch(addCategory({ ...category, id: docRef.id }));
      toast.success("Category added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong " + error.message);
    } finally {
      dispatch(setLoading(false));
      setShowAddCategory(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    dispatch(setLoading(true));

    try {
      if (activeTab === "expense") {
        const docRef = await addDoc(collection(db, "expenses"), {
          ...data,
          userId: auth.currentUser?.uid,
        });
        dispatch(addExpense({ ...data, id: docRef.id }));
        toast.success("Expense added successfully");
      } else {
        const docRef = await addDoc(collection(db, "incomes"), {
          ...data,
          userId: auth.currentUser?.uid,
        });
        dispatch(addIncome({ ...data, id: docRef.id }));
        toast.success("Income added successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong " + error.message);
    } finally {
      dispatch(setLoading(false));
      onClose();
    }
  };

  const expenseCategories = filterCategories(categories, "expense");
  const incomeCategories = filterCategories(categories, "income");

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md relative">
          {/* Tabs */}
          <div className="flex items-center justify-between mb-6">
            <div className="space-x-4">
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
            <button
              onClick={onClose}
              className="text-gray-500 pb-2 px-1 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <FaTimes />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-400">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-gray-200 px-3 py-2"
                placeholder={`${
                  activeTab === "expense" ? "Expense" : "Income"
                } title`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-400">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="amount"
                  className="w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:bg-slate-900 pl-7 pr-3 py-2 dark:text-gray-200"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-400">
                Date
              </label>
              <input
                type="date"
                name="date"
                className="w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:bg-slate-900 px-3 py-2 dark:text-gray-200"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1 dark:text-gray-400">
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
                name="category"
                className="w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:bg-slate-900 px-3 py-2 dark:text-gray-200"
              >
                <option value="">Select category</option>
                {activeTab === "expense" ? (
                  <>
                    {expenseCategories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    {incomeCategories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-400">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                className="w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:bg-slate-900 px-3 py-2 dark:text-gray-200"
                rows="3"
                placeholder="Add any additional notes..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm md:text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <SubmitButton
                isLoading={loading}
                label={activeTab === "expense" ? "Add Expense" : "Add Income"}
                loadingLabel="Saving..."
                className={`${
                  activeTab === "expense"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              />
            </div>
          </form>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCategory && (
        <AddCategoryModal
          handleSubmit={handleAddCategory}
          setShowAddModal={setShowAddCategory}
          setEditingCategory={() => {}}
          type={activeTab}
        />
      )}
    </>
  );
}
