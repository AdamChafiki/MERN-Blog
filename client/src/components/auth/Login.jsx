import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
const LoginForm = () => {
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(loginUser(credentials));
  };


  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-8 min-h-screen">
      {loading === "loading" ? <Loader /> : <></>}

      <h1 className="text-2xl font-bold my-5">Login/Blog</h1>

      {loading === "failed" && <p className="text-red-100 bg-red-500 p-2 my-4 rounded-md ">Error: {error}</p>}

      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          ref={emailRef}
          name="email"
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          ref={passwordRef}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <button
          type="submit"
          className="bg-gray-500 text-white py-2 px-4 rounded"
          disabled={loading === "loading"}
        >
          {loading === "loading" ? "Logging in..." : "Login"}
        </button>
        <Link
          to="/auth/reset/password"
          className="text-blue-500 hover:underline focus:outline-none"
        >
          Forget Password?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
