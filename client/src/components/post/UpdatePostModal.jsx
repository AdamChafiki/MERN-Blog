import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import { updatePosts } from "../../redux/slices/postSlice";

const UpdatePostModal = ({ updatePost, setUpdatePost, id }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
    };

    try {
      await dispatch(updatePosts({ updateData, id, setUpdatePost }));
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50 ">
      {loading === "loading" ? <Loader /> : <></>}

      <div className="modal-container bg-white  md:w-1/2 p-6 rounded shadow-lg ">
        <button
          className="cursor-pointer w-full text-end"
          title="close"
          onClick={() => setUpdatePost(!updatePost)}
        >
          <span className="material-symbols-outlined text-2xl font-bold ">
            close
          </span>
        </button>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">Title:</span>
            <input
              type="text"
              ref={titleRef}
              className="form-input p-2  mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Description:</span>
            <textarea
              ref={descriptionRef}
              className="form-input p-2  mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>

          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePostModal;
