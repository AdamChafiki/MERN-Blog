import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { postsReducer } from "./slices/postSlice";
import { categoriesReducer } from "./slices/categoriesSlice";
import { commentReducer } from "./slices/commentSlice";
import { passwordReducer } from "./slices/passwordSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    posts: postsReducer,
    categories: categoriesReducer,
    comments: commentReducer,
    password: passwordReducer,
  },
});
