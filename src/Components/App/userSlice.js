import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: [], 
  reducers: {
    register: (state, action) => {
      
      state.push(action.payload);
      // console.log("**user state",state);
      // console.log("**usersilce",action);
    },
  },
});

export const { register } = userSlice.actions;

export default userSlice.reducer;
