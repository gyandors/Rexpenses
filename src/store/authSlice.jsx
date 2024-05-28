import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jwtToken: localStorage.getItem('jwtToken'),
  loggedIn: !!localStorage.getItem('jwtToken'),
  userName: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem('jwtToken', action.payload.jwtToken);
      state.loggedIn = true;
      state.jwtToken = action.payload.jwtToken;
      state.userName = action.payload.userName;
    },
    logout(state) {
      localStorage.removeItem('jwtToken');
      state.jwtToken = null;
      state.loggedIn = false;
      state.userName = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
/**
 We are splitting the slice part in different file, by splitting the file we can write slice functions in individual files and redux store logic in another file, which makes easier to read the code.
The logic behind dividing files is Code readability, Easier to reuse the functions. As the project becomes larger it become hard to work on specific functions.




The redux have only one central state called store, and it executes the reducer function initially, when any actions are dispatched from the component, those actions are handled by the reducer function. The reducer is simple JavaScript function which takes the state and an action as parameter, based on the action payload it executes the statements and returns new state.
useDispatch is the hook provided by the React Redux, used for dispatch the actions to redux store. combineReducers() is a function in Redux, which helps to combine multiple reducers into one root reducer. useSelector is a hook by the React Redux, used to select the specific state from the redux store.
When we are building big project where the state updates are frequent, then we should use Redux. If our project is small and don't have multiple frequent states then we can go with contextApi and we should avoid using Redux.
 */
