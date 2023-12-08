import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  count: 0,
  profile: [],
  profiles: [],
  user: null,
  loading: "idle",
  error: null,
};

export const fetchUserProfileById = createAsyncThunk(
  "auth/fetchUserProfileById",
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWQwMGExZDc5MmUzNzFkNzA1NTA5YyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDA2MDI3MTd9.zFTfvUW_EP1d4SXVy56455JhmE0YpiWGp8P7yra8GJk`,
          },
        }
      );

      console.log("Fetch User Profile Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("Fetch User Profile Error:", error.message);
      throw error.response.data.message;
    }
  }
);

export const getAllProfiles = createAsyncThunk(
  "profile/getAllProfiles",
  async (payload, { getState }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Fetch User Profile Error:", error.message);
      throw error.response.data.message;
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (
    { formData, updatePhotoPorfile, setUpdatePhoto },
    { dispatch, getState }
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/users/profile/photo`,
        formData,
        {
          headers: {
            // Explicitly set Content-Type to multipart/form-data
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );

      await dispatch(updatePhotoPorfile(response.data.profilePhoto));
      setUpdatePhoto(false);
      return response.data;
    } catch (error) {
      console.error("Update Profile Error:", error.message);
      throw error.response.data.message;
    }
  }
);

export const updateProfileInfo = createAsyncThunk(
  "profile/updateProfileInfo",
  async (
    { updatedData, id, setUpdateProfile, updateInfoUser },
    { dispatch, getState }
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/profile/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      await dispatch(updateInfoUser(response.data.username));
      setUpdateProfile(false);
      console.log("Update Profile Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("Update Profile Error:", error.message);
      throw error.response.data.message;
    }
  }
);
export const deleteProfiless = createAsyncThunk(
  "profile/deleteProfiless",
  async (id, { getState }) => {
    try {
      console.log("Deleting profile...");
      const response = await axios.delete(
        `http://localhost:8000/api/users/profile/${getState().auth.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      console.log("Profile deleted successfully:", response.data);
      window.location.assign("/");
      return response.data;
    } catch (error) {
      console.error("Delete Profile Error:", error.message);
      throw error.response.data.message;
    }
  }
);

export const deleteProfileByAdmin = createAsyncThunk(
  "profile/deleteProfileByAdmin",
  async (id, { getState }) => {
    try {
      console.log("Deleting profile...");
      const response = await axios.delete(
        `http://localhost:8000/api/users/profile/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      console.log("Profile deleted successfully:", response.data);
      return id;
    } catch (error) {
      console.error("Delete Profile Error:", error.message);
      throw error.response.data.message;
    }
  }
);

export const getProfilesCount = createAsyncThunk(
  "profile/getProfilesCount",
  async (payload, { getState }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/count`,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Fetch User Profile Error:", error.message);
      throw error.response.data.message;
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.user.posts.push(action.payload);
    },
    deleteProfileFromArray: (state, action) => {
      console.log(action);
      state.profiles = state.profiles.filter(
        (profile) => profile._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileById.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchUserProfileById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserProfileById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteProfiless.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(deleteProfiless.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload;
      })
      .addCase(deleteProfiless.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(updateProfileInfo.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateProfileInfo.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = "succeeded";
        state.user.username = action.payload.username;
        state.user.bio = action.payload.bio;
        const currentUser = JSON.parse(localStorage.getItem("user"));

        if (currentUser) {
          currentUser.user = action.payload?.username;
          localStorage.setItem("user", JSON.stringify(currentUser));
        }
      })
      .addCase(updateProfileInfo.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user.profilePhoto = action.payload.profilePhoto;

        state.profile = action.payload.profilePhoto;

        // Update user's profile photo URL in local storage
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (currentUser) {
          currentUser.profilePhoto = action.payload?.profilePhoto;
          localStorage.setItem("user", JSON.stringify(currentUser));
        }
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getProfilesCount.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getProfilesCount.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getProfilesCount.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.count = action.payload;
      })
      .addCase(getAllProfiles.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getAllProfiles.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getAllProfiles.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.profiles = action.payload;
      })
      .addCase(deleteProfileByAdmin.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteProfileByAdmin.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(deleteProfileByAdmin.fulfilled, (state, action) => {
        state.loading = "succeeded";
        profileSlice.caseReducers.deleteProfileFromArray(state, action);
      });
  },
});

const profileReducer = profileSlice.reducer;
const profileActions = {
  fetchUserProfileById,
  deleteProfiless,
  getProfilesCount,
  getAllProfiles,
  deleteProfileByAdmin,
};

export { profileActions, profileReducer };
export const { addPost } = profileSlice.actions;
