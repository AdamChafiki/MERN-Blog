import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
const initialState = {
  categories: [],
  loading: "idle",
  error: null,
};

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async ({ data, addCategoryToArrray }, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/category",
        data,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      toast.success("Category was added !"), { duration: 2000 };

      await dispatch(addCategoryToArrray(response.data));
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/category", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWQwMGExZDc5MmUzNzFkNzA1NTA5YyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDA2MDI3MTd9.zFTfvUW_EP1d4SXVy56455JhmE0YpiWGp8P7yra8GJk`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { getState }) => {
    try {
      await axios.delete(`http://localhost:8000/api/category/${id}`, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      return id;
    } catch (error) {
      console.error("Delete Category Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, data }, { getState }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/category/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      return { id, updatedData: response.data.title };
    } catch (error) {
      console.error("Update Category Error:", error.response.data.message);
      throw error.response.data.message;
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategoryToArrray: (state, action) => {
      state.categories.push(action.payload);
    },
    deleteCategoryFromArray: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
    },
    updateCategoryInArray: (state, action) => {
      const { id, updatedData } = action.payload;
      state.categories.map((category) =>
        category._id === id ? (category.title = updatedData) : category
      );
      //
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = "succeeded";
        // Dispatch the custom reducer to delete the category from the state
        categoriesSlice.caseReducers.deleteCategoryFromArray(state, action);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = "succeeded";
        // Dispatch the custom reducer to update the category in the state
        categoriesSlice.caseReducers.updateCategoryInArray(state, action);
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

const categoriesReducer = categoriesSlice.reducer;
const authActions = {
  getAllCategories,
  addCategory,
};

export { authActions, categoriesReducer };
export const { addCategoryToArrray } = categoriesSlice.actions;
