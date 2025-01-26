import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "./reducers/categorySlice";
import expenseReducer from "./reducers/expenseSlice";
import incomeReducer from "./reducers/incomeSlice";

const store = configureStore({
  reducer: {
    categoryState: categoryReducer,
    expenseState: expenseReducer,
    incomeState: incomeReducer,
  },
});

export default store;
