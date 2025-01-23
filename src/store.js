import { configureStore } from "@reduxjs/toolkit";

import expenseReducer from "./reducers/expenseSlice";

const store = configureStore({
  reducer: {
    expenseState: expenseReducer,
  },
});

export default store;
