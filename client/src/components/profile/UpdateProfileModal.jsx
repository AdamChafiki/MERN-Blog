import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfileInfo } from "../../redux/slices/profileSlice";
import { useParams } from "react-router-dom";
import { updateInfoUser } from "../../redux/slices/authSlice";

const UpdateProfileModal = ({ updateProfile, setUpdateProfile }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      username: titleRef.current.value,
      bio: descriptionRef.current.value,
      password: password,
    };
    dispatch(
      updateProfileInfo({ updatedData, id, setUpdateProfile, updateInfoUser })
    );

    titleRef.current.value = "";
    descriptionRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
      <div className="modal-container bg-white md:w-1/2 p-6 rounded shadow-lg">
        <button
          className="cursor-pointer w-full text-end"
          title="close"
          onClick={() => setUpdateProfile(!updateProfile)}
        >
          <span className="material-symbols-outlined text-2xl font-bold">
            close
          </span>
        </button>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">Username:</span>
            <input
              type="text"
              ref={titleRef}
              className="form-input p-2 mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Bio:</span>
            <textarea
              ref={descriptionRef}
              className="form-input p-2 mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Password:</span>
            <input
              type="password"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input p-2 mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
