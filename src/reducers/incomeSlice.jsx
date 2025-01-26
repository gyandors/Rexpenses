import { createSlice } from "@reduxjs/toolkit";

const initialState = { incomes: [], totalIncomes: 0 };

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    setIncomes(state, action) {
      state.incomes = action.payload;
    },

    setTotalIncomes(state, action) {
      state.totalIncomes = action.payload;
    },

    addIncome(state, action) {
      state.incomes = [...state.incomes, action.payload];
    },

    deleteIncome(state, action) {
      state.incomes = state.incomes.filter(
        (income) => income.id !== action.payload
      );
    },

    updateIncome(state, action) {
      state.incomes = state.incomes.map((income) =>
        income.id === action.payload.id ? action.payload : income
      );
    },
  },
});

export default incomeSlice.reducer;

export const {
  setIncomes,
  setTotalIncomes,
  addIncome,
  deleteIncome,
  updateIncome,
} = incomeSlice.actions;
