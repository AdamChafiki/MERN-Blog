import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Posts from "./pages/posts/Posts";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/header/Header";
import Footer from "./components/footeer/Footer";
import PostDetails from "./components/post/PostDetails";
import CategoryPosts from "./pages/category/Category";
import Profile from "./pages/profile/Profile";
import AdminDahsboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminComments from "./pages/admin/AdminComments";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NotFound from "./pages/notFound/NotFound";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/verify-email/VerifyEmail";
function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          index
          element={!user ? <Navigate to="/auth/login" /> : <Home />}
        />
        <Route path="post">
          <Route index element={<Posts />} />
          <Route path="details/:id" element={<PostDetails />} />
          <Route path="categories/:category" element={<CategoryPosts />} />
        </Route>
        <Route
          path="profile/:id"
          element={!user ? <Navigate to="/" /> : <Profile />}
        />

        <Route path="admin/dashboard">
          <Route
            path=""
            element={user?.isAdmin ? <AdminDahsboard /> : <Navigate to="/" />}
          />
          <Route
            path="users"
            element={user?.isAdmin ? <AdminUsers /> : <Navigate to="/" />}
          />
          <Route
            path="posts"
            element={user?.isAdmin ? <AdminPosts /> : <Navigate to="/" />}
          />
          <Route
            path="categories"
            element={user?.isAdmin ? <AdminCategories /> : <Navigate to="/" />}
          />
          <Route
            path="comments"
            element={user?.isAdmin ? <AdminComments /> : <Navigate to="/" />}
          />
        </Route>

        <Route path="auth">
          <Route
            path="login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />

          <Route
            path="reset/:id/:token"
            element={!user ? <ResetPassword /> : <Navigate to="/" />}
          />
          <Route
            path="reset/password"
            element={!user ? <ForgotPassword /> : <Navigate to="/" />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />

        <Route
          path="/users/:id/verify/:token"
          element={!user ? <VerifyEmail /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
