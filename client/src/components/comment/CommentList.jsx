import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/slices/commentSlice";
import { deleteCommentPost } from "../../redux/slices/postSlice";
import { useState } from "react";
import UpdateCommentModal from "./UpdateCommentModal";
const CommentList = ({ comments }) => {
  const dispatch = useDispatch();
  const [updateComment, setUpdateComment] = useState(false);
  const [updateCommentId, setUpdateCommentId] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const handleDeleteComment = (id) => {
    console.log(id);
    dispatch(deleteComment({ id, deleteCommentPost }));
  };
  const handleUpdateComment = async (id) => {
    setUpdateCommentId(id);
    setUpdateComment(true);
  };
  return (
    <ul className="comment-list flex flex-col space-y-4 py-4">
      {comments?.map((comment, index) => (
        <li className="mb-4 border-2 shadow-md  p-2 rounded-md" key={index}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img
                className="w-8 h-8 mr-2 rounded-full"
                src={comment?.user?.profilePhoto?.url}
                alt="profile"
              />
              <p className="font-semibold text-sm">{comment?.user?.username}</p>
            </div>
            <div className="flex items-center space-x-3">
              {user?._id == comment?.user?._id && (
                <>
                  <button onClick={() => handleUpdateComment(comment?._id)}>
                    <span className="material-symbols-outlined text-blue-600">
                      edit
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      dispatch(
                        deleteComment({ id: comment._id, deleteCommentPost })
                      )
                    }
                  >
                    <span className="material-symbols-outlined text-red-600">
                      delete
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
          <p className="text-gray-700">{comment?.text}</p>
        </li>
      ))}
      {updateComment ? (
        <UpdateCommentModal
          setUpdateComment={setUpdateComment}
          id={updateCommentId}
          updateComment={updateComment}
        />
      ) : (
        ""
      )}
    </ul>
  );
};

export default CommentList;
