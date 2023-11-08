import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

export const login = createAsyncThunk(
  '/auth/signin',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const token = await authService.login(email, password);
      return token;
    } catch (error) {
      throw error;
    }
  }
);
