import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"; // Assuming you are using React Router for navigation
import { verifyAccountUser } from "../../redux/slices/authSlice";
import Loader from "../../components/loader/Loader";
const VerifyEmail = () => {
  const { id, token } = useParams();
  const dispatch = useDispatch();
  const { verifyAccount, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyAccountUser({ id, token }));
  }, [id, token, dispatch]);
  return (
    <>
      {loading === "loading" ? <Loader /> : <></>}
      <section className="verify_email min-h-screen flex items-center justify-center bg-gray-200">
        {verifyAccount ? (
          <div className="text-center p-8 bg-white rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Email Verified Successfully!
            </h2>
            <p className="text-gray-600 mb-8">
              Thank you for verifying your email. You can now proceed to log in.
            </p>
            <Link to="/auth/login">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Go to Login
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                404 Not Found
              </h1>
              <p className="text-gray-600 mb-8">
                The page you are looking for doesn&apos;t exist.
              </p>
              <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded">
                Go Home
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default VerifyEmail;
