import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComments } from "../../redux/slices/commentSlice";
import { updateCommentPost } from "../../redux/slices/postSlice";
import Loader from "../loader/Loader";
const UpdateCommentModal = ({ updateComment, setUpdateComment, id }) => {
  const commentRef = useRef(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.comments);

  console.log(id);
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      text: commentRef.current.value,
    };

    dispatch(updateComments({ id, data, updateCommentPost, setUpdateComment }));

    commentRef.current.value = "";
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50 ">
      {loading === "loading" ? <Loader /> : <></>}

      <div className="modal-container bg-white md:w-1/2 p-6 rounded shadow-lg">
        <button
          className="cursor-pointer w-full text-end"
          title="close"
          onClick={() => setUpdateComment(!updateComment)}
        >
          <span className="material-symbols-outlined text-2xl font-bold">
            close
          </span>
        </button>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">Comment:</span>
            <input
              type="text"
              ref={commentRef}
              className="form-input p-2 mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Update Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommentModal;
