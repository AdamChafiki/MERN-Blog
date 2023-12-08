import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { sendResetPasswordLink } from "../../../redux/slices/passwordSlice";
const ForgotPasswordForm = () => {
  const emailRef = useRef(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.password);
  const handleResetPassword = (e) => {
    e.preventDefault();
    const data = { email: emailRef.current.value };
    dispatch(sendResetPasswordLink(data));
  };

  return (
    <form
      onSubmit={handleResetPassword}
      className="max-w-sm mx-auto mt-8 min-h-screen "
    >
      {loading === "loading" ? <Loader /> : <></>}
      <h1 className="text-2xl font-bold my-5">Forgot password/Blog</h1>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <button className="bg-gray-500 w-full text-white py-2 px-4 rounded">
        Send Email
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
