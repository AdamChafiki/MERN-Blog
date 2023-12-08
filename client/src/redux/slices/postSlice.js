import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  count: 0,
  posts: [],
  loading: "idle",
  error: null,
};

export const createPosts = createAsyncThunk(
  "posts/createPosts",
  async ({ formData, addPost }, { dispatch, getState }) => {
    console.log(getState().auth.user.token);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/posts/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      console.log(response);
      dispatch(addPost(response.data));
      return response.data;
    } catch (error) {
      console.error("Error:", error.response.data);
      throw error.response.data.message;
    }
  }
);

export const getLatestPosts = createAsyncThunk(
  "posts/getLatestPosts",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/posts/latest/four"
      );
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const getPostsDetails = createAsyncThunk(
  "posts/getPostsDetails",
  async (id, { getState }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const getPostsByPage = createAsyncThunk(
  "posts/getPostsByPage",
  async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/posts?page=${page}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWQwMGExZDc5MmUzNzFkNzA1NTA5YyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDA2MDI3MTd9.zFTfvUW_EP1d4SXVy56455JhmE0YpiWGp8P7yra8GJk`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const getPostsByCategory = createAsyncThunk(
  "posts/getPostsByCategory",
  async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/posts?category=${category}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWQwMGExZDc5MmUzNzFkNzA1NTA5YyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDA2MDI3MTd9.zFTfvUW_EP1d4SXVy56455JhmE0YpiWGp8P7yra8GJk`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const updatePostImage = createAsyncThunk(
  "profile/updatePostImage",
  async ({ formData, id, setUpdatePhoto }, { getState }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/posts/upload/${id}`,
        formData,
        {
          headers: {
            // Explicitly set Content-Type to multipart/form-data
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      setUpdatePhoto(false);
      console.log("Update Post Image Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("Update Profile Error:", error.message);
      throw error.response.data.message;
    }
  }
);

export const updatePosts = createAsyncThunk(
  "profile/updatePosts",
  async ({ updateData, id, setUpdatePost }, { getState }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/posts/${id}`,
        updateData,
        {
          headers: {
            // Explicitly set Content-Type to multipart/form-data
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      setUpdatePost(false);
      console.log("Update Post Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("Update Profile Error:", error.message);
      throw error.response.data.message;
    }
  }
);

export const getPostsCount = createAsyncThunk(
  "posts/getPostsCount",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/posts/count/all"
      );
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const toggleLikePost = createAsyncThunk(
  "posts/toggleLikePost",
  async (id, { getState }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/posts/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { getState }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      console.log(response);
      return id;
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (id, { getState }) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/posts`, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const deleteSinglePost = createAsyncThunk(
  "posts/deleteSinglePost",
  async ({ id, nav }, { getState }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      nav("/");
      console.log(response);
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.posts.comments.push(action.payload);
    },
    deleteCommentPost: (state, action) => {
      const commentIdToDelete = action.payload;
      console.log(commentIdToDelete);

      const updatedComments = state.posts.comments.filter(
        (comment) => comment._id !== commentIdToDelete
      );

      state.posts.comments = [...updatedComments];
    },
    updateCommentPost: (state, action) => {
      const updatedComment = action.payload; // Assuming you pass the updated comment as payload

      // Use map to create a new array with the updated comment
      const updatedComments = state.posts.comments.map((comment) =>
        comment._id === updatedComment._id ? updatedComment : comment
      );
      console.log(updatedComments);

      state.posts.comments = [...updatedComments];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getLatestPosts.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getLatestPosts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getLatestPosts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getPostsByPage.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getPostsByPage.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getPostsByPage.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getPostsCount.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getPostsCount.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.count = action.payload;
      })
      .addCase(getPostsCount.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getPostsByCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getPostsByCategory.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getPostsByCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(createPosts.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(createPosts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.posts = action.payload;
      })
      .addCase(createPosts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getPostsDetails.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getPostsDetails.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getPostsDetails.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteSinglePost.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(deleteSinglePost.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(deleteSinglePost.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(toggleLikePost.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(toggleLikePost.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.posts.likes = action.payload.likes;
      })
      .addCase(toggleLikePost.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(updatePostImage.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updatePostImage.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.posts = action.payload;
      })
      .addCase(updatePostImage.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(updatePosts.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updatePosts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.posts = action.payload;
      })
      .addCase(updatePosts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.posts = state.posts.filter((p) => p._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

const postsReducer = postsSlice.reducer;
const authActions = {
  getLatestPosts,
  getPostsByPage,
  getPostsCount,
  getPostsByCategory,
  createPosts,
  getPostsDetails,
  toggleLikePost,
  updatePostImage,
  updatePosts,
};

export { authActions, postsReducer };
export const { addComment, deleteCommentPost, updateCommentPost } =
  postsSlice.actions;
