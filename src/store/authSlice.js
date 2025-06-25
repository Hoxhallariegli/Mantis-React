import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
    loading: false,
    error: null
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
 loginSuccess(state, action) {
  state.loading = false;
  console.log('Received payload:', action.payload); 
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
},
loginFailure(state, action) {
    state.loading = false;
    state.error = action.payload;
    state.isLoggedIn = false;
  },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      state.loading = false;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
