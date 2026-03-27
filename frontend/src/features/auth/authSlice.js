import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// eslint-disable-next-line no-unused-vars
import { loginApi, logoutApi, registerApi } from "../../api/auth.api";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, thunkAPI) => {
    try {
      return await loginApi(payload);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "login failed",
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, thunkAPI) => {
    try {
      return await registerApi(payload);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "registeration failed",
      );
    }
  },
);

// export const logoutUser = createAsyncThunk(async (thunkAPI) => {
//   try {
//     return await logoutApi();
//   } catch (err) {
//     return thunkAPI.rejectWithValue(
//       err.response?.data?.message || "logout failed",
//     );
//   }
// });

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
