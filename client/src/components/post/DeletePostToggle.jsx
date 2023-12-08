import { useState } from "react";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { deleteSinglePost } from "../../redux/slices/postSlice";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";

const DeletePostToggle = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts);
  const nav = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSinglePost({id,nav}));
  };

  const handleCancel = () => {
    setIsDeleting(false); // Close the delete toggle
  };

  return (
    <div className="relative inline-block">
      {loading === "loading" ? <Loader /> : <></>}

      <button
        onClick={() => setIsDeleting(!isDeleting)}
        className="bg-red-500 text-white py-2 px-4 rounded mr-2 hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
      >
        Delete
      </button>

      {isDeleting && (
        <div className="absolute z-10 right-0 mt-2 bg-white border border-gray-300 p-2 rounded shadow-lg">
          <p className="mb-2">Are you sure you want to delete this post?</p>
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
            >
              Confirm
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// DeletePostToggle.propTypes = {
//   onDelete: PropTypes.func.isRequired,
//   onCancel: PropTypes.func.isRequired,
// };

export default DeletePostToggle;
