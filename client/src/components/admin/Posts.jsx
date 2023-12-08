import { useState } from "react";
import { Link } from "react-router-dom";
import DeletePost from "./DeletePost";
const PostsTable = ({ postsData }) => {
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [deleteProfileId, setDeleteProfileId] = useState(null);
  // Check if postsData is an array
  if (!Array.isArray(postsData)) {
    console.error("postsData is not an array:", postsData);
    return null; // or display an error message
  }
  const handleDeleteUser = (id) => {
    setDeleteProfileId(id);
    setDeleteProfile(!deleteProfile);
  };
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Post image</th>
          <th className="p-2">Username</th>
          <th className="p-2">Title</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {postsData.map((post) => (
          <tr key={post?._id} className="border-t border-gray-300">
            <td className="p-2">
              {/* Assuming the user has a profile image */}
              <img
                src={post?.postPhoto?.url}
                alt={`Profile of `}
                className="w-40 h-40 mx-auto"
              />
            </td>
            <td className="p-2">{post?.user?.username}</td>
            <td className="p-2">{post?.title}</td>
            <td className="p-2 space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDeleteUser(post?._id)}
              >
                Delete
              </button>
              <Link target="_blanck" to={`/post/details/${post.id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  View Post
                </button>
              </Link>
            </td>
          </tr>
        ))}
        {deleteProfile && (
          <DeletePost
            deleteProfile={deleteProfile}
            setDeleteProfile={setDeleteProfile}
            id={deleteProfileId}
          />
        )}
      </tbody>
    </table>
  );
};

export default PostsTable;
