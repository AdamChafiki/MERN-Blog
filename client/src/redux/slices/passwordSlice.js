import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  message: null,
  loading: "idle",
  error: null,
};

export const sendResetPasswordLink = createAsyncThunk(
  "password/sendResetPasswordLink",
  async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/password/reset",
        data
      );
      console.log(response);
      alert("Check your email !");
    } catch (error) {
      console.error("Link Error:", error.message);
      throw error.response.data.message;
    }
  }
);

export const checkValidateToken = createAsyncThunk(
  "password/checkValidateToken",
  async ({ id, token }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/password/reset/${id}/${token}`
      );
      console.log(response);
      alert("Validate Token");
    } catch (error) {
      alert("inValidate Token");

      console.error("Link Error:", error.message);
      throw error.response.data.message;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "password/resetPassword ",
  async ({ id, token, password }) => {
    console.log(password);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/password/reset/${id}/${token}`,
        { password }
      );
      console.log(response);
      alert("Password was reseted !");
    } catch (error) {
      alert("inValidate Token");
      console.log(error);
      console.error("Link Error:", error.message);
      throw error.response.data.message;
    }
  }
);

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendResetPasswordLink.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(sendResetPasswordLink.fulfilled, (state) => {
        state.loading = "succeeded";
        state.message = "Link was send to your email !";
      })
      .addCase(sendResetPasswordLink.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(checkValidateToken.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(checkValidateToken.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(checkValidateToken.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

const passwordReducer = passwordSlice.reducer;
const passwordActions = {
  sendResetPasswordLink,
  checkValidateToken,
  resetPassword,
};

export { passwordActions, passwordReducer };
// export const { updatePhotoPorfile, update } = authSlice.actions;
