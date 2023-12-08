import {useRef } from "react";
import { createComment } from "../../redux/slices/commentSlice";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deleteCommentPost } from "../../redux/slices/postSlice";

const AddComment = ({ id }) => {
  const dispatch = useDispatch();
  const commInpt = useRef(null);
  const { loading} = useSelector((state) => state.comments);
  const handleCreateComment =  (e) => {
    e.preventDefault();
    const data = {
      postId: id,
      text: commInpt.current.value,
    };

    dispatch(createComment({data,addComment}));

    commInpt.current.value = "";
  };

  return (
    <>
      {loading === "loading" ? <Loader /> : <></>}
      <div className="comment_post">
        <form onSubmit={handleCreateComment}>
          <div className="mb-4">
            <textarea
              ref={commInpt}
              rows="4"
              placeholder="Add a comment..."
              className="w-full p-2 border rounded-md"
            />
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full">
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddComment;
