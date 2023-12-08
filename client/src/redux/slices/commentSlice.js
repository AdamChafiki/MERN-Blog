import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comment: [],
  loading: "idle",
  error: null,
};

export const getAllComments = createAsyncThunk(
  "comments/getAllComments",
  async (data, { getState }) => {
    try {
      const response = await axios.get("http://localhost:8000/api/comments", {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });

      console.log(response);

      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const createComment = createAsyncThunk(
  "auth/createComment",
  async ({ data, addComment }, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/comments",
        data,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );

      console.log("Comment Success:", response);

      // Move this line above the return statement
      dispatch(addComment(response.data));

      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);
export const deleteComment = createAsyncThunk(
  "auth/deleteComment",
  async ({ id, deleteCommentPost }, { dispatch, getState }) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );

      await dispatch(deleteCommentPost(id));

      console.log("Comment Deleted:", response);

      return id;
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const updateComments = createAsyncThunk(
  "auth/updateComment",
  async (
    { id, data, updateCommentPost, setUpdateComment },
    { dispatch, getState }
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/comments/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );

      console.log("Comment Updated:", response);

      await dispatch(updateCommentPost(response.data.updateComment));
      setUpdateComment(false);
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const deleteComment2 = createAsyncThunk(
  "auth/deleteComment2",
  async (id, { getState }) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );

      console.log("Comment Deleted:", response);

      return id;
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.comment = action.payload;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(updateComments.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateComments.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.comment = action.payload;
      })
      .addCase(updateComments.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getAllComments.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.comment = action.payload;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        console.log(action);
        state.loading = "succeeded";
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteComment2.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(deleteComment2.fulfilled, (state, action) => {
        console.log(action);
        state.loading = "succeeded";
        state.comment = state.comment.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteComment2.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

const commentReducer = commentSlice.reducer;
const commentActions = {
  createComment,
  getAllComments,
  deleteComment,
  deleteComment2,
};

export { commentActions, commentReducer };
// export const { updatePhotoPorfile, update } = authSlice.actions;
