import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './authSlice';
import counterReducer from "./counterSlice"; 


// Persist config for auth slice (you can persist other slices too if needed)
const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['user', 'token', 'isLoggedIn']  // only persist these keys from auth state
  };

  const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    counter: counterReducer,
    // sidebar: sidebarReducer,
    auth:persistedAuthReducer,
  },
});



export const persistor = persistStore(store);

export default store;