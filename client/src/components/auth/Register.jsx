import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { Toaster } from "sonner";
import Loader from "../loader/Loader";
const RegisterForm = () => {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(registerUser(credentials));
    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm min-h-screen mx-auto mt-8"
    >
      {loading === "loading" ? <Loader /> : <></>}

      <Toaster richColors position="bottom-right" time="2" />
      <h1 className="text-2xl font-bold my-5">Register/Blog</h1>
      {loading === "failed" && (
        <p className="text-red-300 bg-red-500 p-2 my-3 rounded-md">
          Error: {error}
        </p>
      )}

      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          ref={usernameRef}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          id="email"
          ref={emailRef}
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
          ref={passwordRef}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <button
        className="bg-gray-500 text-white py-2 px-4 rounded w-full"
        disabled={loading === "loading"}
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
