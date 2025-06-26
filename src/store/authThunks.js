import axiosClient from 'utils/axios';
import { updateUserSuccess } from './authSlice';

export const updateUser = (userData) => async (dispatch) => {
  try {
    // Always call this before protected requests in SPA mode
    await axiosClient.get('/sanctum/csrf-cookie');

    const response = await axiosClient.put('/api/user/update', userData);

    dispatch(updateUserSuccess(response.data));
  } catch (error) {
    console.error('Failed to update user:', error.response?.data || error.message);
  }
};
