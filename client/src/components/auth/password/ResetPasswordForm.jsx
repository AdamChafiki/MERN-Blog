import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { useParams } from "react-router-dom";
import {
  checkValidateToken,
  resetPassword,
} from "../../../redux/slices/passwordSlice";
const ForgotPasswordForm = () => {
  const { id, token } = useParams();
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.password);
  const handleResetPassword = (e) => {
    e.preventDefault();
    const data = { id, token, password: passwordRef.current.value };
    dispatch(resetPassword(data));
  };

  useEffect(() => {
    dispatch(checkValidateToken({ id, token }));
  }, [dispatch, id, token]);

  return (
    <form
      onSubmit={handleResetPassword}
      className="max-w-sm mx-auto mt-8 min-h-screen "
    >
      {loading === "loading" ? <Loader /> : <></>}
      <h1 className="text-2xl font-bold my-5">Reset password/Blog</h1>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          New password
        </label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          className="border rounded w-full py-2 px-3"
          required
        />
      </div>
      <button className="bg-gray-500 w-full text-white py-2 px-4 rounded">
        Reset Password
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
