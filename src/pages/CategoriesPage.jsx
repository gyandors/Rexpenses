import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  addCategory,
  deleteCategory,
  setLoading,
  updateCategory,
} from "../reducers/categorySlice";
import { auth, db } from "../firebase";
import AddCategoryModal from "../components/UI/AddCategoryModal";
import ExpenseCategories from "../components/Categories/ExpenseCategoies";
import IncomeCategories from "../components/Categories/IncomeCategories";
import { filterCategories } from "../utils/utilities";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryState);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.name.value.trim() === "") {
      toast.error("Category name is required");
      return;
    }

    dispatch(setLoading(true));
    try {
      if (editingCategory) {
        await updateDoc(doc(db, "categories", editingCategory.id), {
          name: e.target.name.value,
          type: e.target.type.value,
        });

        dispatch(
          updateCategory({
            ...editingCategory,
            name: e.target.name.value,
            type: e.target.type.value,
          })
        );

        toast.success("Category updated successfully");
      } else {
        const category = {
          name: e.target.name.value,
          type: e.target.type.value,
          createdAt: Date.now().toString(),
          userId: auth.currentUser?.uid,
        };

        const docRef = await addDoc(collection(db, "categories"), category);

        dispatch(addCategory({ ...category, id: docRef.id }));

        toast.success("Category added successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong " + error.message);
    } finally {
      setShowAddModal(false);
      setEditingCategory(null);
      dispatch(setLoading(false));
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteDoc(doc(db, "categories", id));
      dispatch(deleteCategory(id));
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong " + error.message);
    }
  };

  const filteredExpenseCategories = filterCategories(categories, "expense");

  const filteredIncomeCategories = filterCategories(categories, "income");

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center my-6">
        <h1 className="text-xl md:text-2xl font-bold dark:text-white">
          Categories
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 text-sm md:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all"
        >
          <FaPlus className="mr-2" />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExpenseCategories
          filteredExpenseCategories={filteredExpenseCategories}
          setEditingCategory={setEditingCategory}
          handleDeleteCategory={handleDeleteCategory}
        />

        <IncomeCategories
          filteredIncomeCategories={filteredIncomeCategories}
          setEditingCategory={setEditingCategory}
          handleDeleteCategory={handleDeleteCategory}
        />
      </div>

      {(showAddModal || editingCategory) && (
        <AddCategoryModal
          handleSubmit={handleSubmit}
          setShowAddModal={setShowAddModal}
          editingCategory={editingCategory}
          setEditingCategory={setEditingCategory}
        />
      )}
    </>
  );
}
