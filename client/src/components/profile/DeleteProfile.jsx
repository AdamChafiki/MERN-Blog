import { useDispatch, useSelector } from "react-redux";
import { deleteProfiless } from "../../redux/slices/profileSlice";
import Loader from "../loader/Loader";
const DeleteProfile = ({ deleteProfile, setDeleteProfile }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile);
  const handleDelete = async () => {
    localStorage.clear();

    try {
      dispatch(deleteProfiless(10));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setDeleteProfile(!deleteProfile);
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
      {loading === "loading" ? <Loader /> : <></>}

      <div className="modal-container bg-white md:w-1/2 p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Delete Profile</h2>
        <p className="mb-4">
          Are you sure you want to delete your profile? This action cannot be
          undone.
        </p>

        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 mr-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfile;
