import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

const initialState = {
  user: null || JSON.parse(localStorage.getItem("user")),
  loading: "idle",
  error: null,
  verifyAccount: false,
};

// Async thunk to handle user logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  // Clear user information from localStorage
  localStorage.removeItem("user");
  return null; // Return null after logout
});

export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      credentials
    );

    console.log("Login Success:", response.data);

    // Save user information to localStorage
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response.data.message);
    throw error.response.data.message;
  }
});

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        userData
      );
      toast.success(response.data.message), { duration: 2000 };
      return response.data;
    } catch (error) {
      console.error("Registration Error:", error.message);
      throw error.response.data.message;
    }
  }
);

export const verifyAccountUser = createAsyncThunk(
  "auth/verifyAccountUser",
  async ({ id, token }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/auth/${id}/verify/${token}`
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Verify error:", error.data.message);
      throw error.response.data.message;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updatePhotoPorfile: (state, action) => {
      state.user.profilePhoto = action.payload;
    },
    updateInfoUser: (state, action) => {
      console.log(action + "from info");
      state.user.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = "idle";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(verifyAccountUser.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(verifyAccountUser.fulfilled, (state) => {
        state.loading = "succeeded";
        state.verifyAccount = true;
      })
      .addCase(verifyAccountUser.rejected, (state, action) => {
        state.loading = "failed";
      });
  },
});

const authReducer = authSlice.reducer;
const authActions = {
  loginUser,
  registerUser,
  logoutUser,
  verifyAccountUser,
};

export { authActions, authReducer };
export const { updatePhotoPorfile, update, updateInfoUser } = authSlice.actions;
