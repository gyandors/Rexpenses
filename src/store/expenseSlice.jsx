import { createSlice } from '@reduxjs/toolkit';

const initialState = { expenses: [], totalExpenseAmount: 0 };

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    fetchedExpense(state, action) {
      state.expenses = action.payload.fetchedData;
      state.totalExpenseAmount = action.payload.totalExpenseAmount;
    },

    addExpense(state, action) {
      state.expenses = [...state.expenses, action.payload];
      state.totalExpenseAmount += action.payload.amount;
    },

    editExpense(state, action) {
      const updatedExpenses = state.expenses.map((e) => {
        if (e.id === action.payload.id) {
          state.totalExpenseAmount =
            state.totalExpenseAmount - e.amount + action.payload.amount;
          return action.payload;
        }
        return e;
      });
      state.expenses = updatedExpenses;
    },

    deleteExpense(state, action) {
      const updatedExpenses = state.expenses.filter((e) => {
        return e.id !== action.payload.delId;
      });
      state.expenses = updatedExpenses;
      state.totalExpenseAmount -= action.payload.amount;
    },
  },
});

export const { fetchedExpense, addExpense, editExpense, deleteExpense } =
  expenseSlice.actions;

export default expenseSlice.reducer;
