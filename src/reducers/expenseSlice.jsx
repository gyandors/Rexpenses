import { createSlice } from "@reduxjs/toolkit";

const initialState = { expenses: [], totalExpenses: 0 };

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
    },

    setTotalExpenses(state, action) {
      state.totalExpenses = action.payload;
    },

    addExpense(state, action) {
      state.expenses = [...state.expenses, action.payload];
    },

    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },

    updateExpense(state, action) {
      state.expenses = state.expenses.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );
    },
  },
});

export default expenseSlice.reducer;

export const {
  setExpenses,
  setTotalExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} = expenseSlice.actions;
