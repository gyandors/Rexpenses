import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import expenseReducer from './expenseSlice';

export const store = configureStore({
  reducer: { authState: authReducer, expenseState: expenseReducer },
});
