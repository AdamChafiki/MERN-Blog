import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import { deleteComment2 } from "../../redux/slices/commentSlice";

const CommentsTable = ({ commentsData }) => {
  const { loading } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  if (!Array.isArray(commentsData)) {
    console.error("commentsData is not an array:", commentsData);
    return null;
  }

  return (
    <table className="w-full border-collapse border border-gray-300">
      {loading === "loading" ? <Loader /> : <></>}

      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">User Profile</th>
          <th className="p-2">Username</th>
          <th className="p-2">Comment</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {commentsData?.map((comment) => (
          <tr key={comment._id} className="border-t border-gray-300">
            <td className="p-2">
              {/* Assuming the user has a profile image */}
              <img
                src={comment.user?.profilePhoto?.url}
                alt={`Profile of ${comment.user.username}`}
                className="w-10 h-10 rounded-full mx-auto"
              />
            </td>
            <td className="p-2">{comment.user.username}</td>
            <td className="p-2">{comment.text}</td>
            <td className="p-2 space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => dispatch(deleteComment2(comment._id))}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommentsTable;
