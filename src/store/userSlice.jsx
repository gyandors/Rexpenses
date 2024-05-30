import { createSlice } from '@reduxjs/toolkit';

const initialState = { proMember: false, theme: '' };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProMember(state) {
      state.proMember = !state.proMember;
      if (state.theme) {
        state.theme = false;
        document.body.classList.toggle('dark');
      }
    },
    setTheme(state) {
      state.theme = !state.theme;
      document.body.classList.toggle('dark');
    },
  },
});

export const { setProMember, setTheme } = userSlice.actions;
export default userSlice.reducer;
