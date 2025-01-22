import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jwtToken: localStorage.getItem('jwtToken'),
  loggedIn: !!localStorage.getItem('jwtToken'),
  loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem('jwtToken', action.payload.jwtToken);
      state.jwtToken = action.payload.jwtToken;
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({
          name: action.payload.name,
          email: action.payload.email,
          uniqueId: action.payload.uniqueId,
        })
      );
      state.loggedInUser = {
        name: action.payload.name,
        email: action.payload.email,
        uniqueId: action.payload.uniqueId,
      };

      state.loggedIn = true;
    },
    logout(state) {
      localStorage.removeItem('jwtToken');
      state.jwtToken = null;
      localStorage.removeItem('loggedInUser');
      state.loggedInUser = null;

      state.loggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
