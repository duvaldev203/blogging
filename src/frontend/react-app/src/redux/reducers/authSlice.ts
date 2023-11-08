import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/authActions";
import { UserResponse } from "../../generated";

interface AuthState {
  token: string | null;
  error: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  user: UserResponse | null;
}

const initialState: AuthState = {
  token: null,
  error: null,
  loading: false,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token!;
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload.user!;
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      if (action.error.message == "Request failed with status code 403") {
        state.error = "Email ou mot de passe invalide"
      } else {
      state.error = action.error.message!;
      }
      state.isAuthenticated = true;
      state.user = null;
    });
  },
});

export default authSlice.reducer;