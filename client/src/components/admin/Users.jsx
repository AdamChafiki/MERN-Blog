import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteUser from "./DeleteUser";
const UsersTable = ({ usersData }) => {
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [deleteProfileId, setDeleteProfileId] = useState(null);

  const handleDeleteUser = (id) => {
    setDeleteProfileId(id);
    setDeleteProfile(!deleteProfile);
  };
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Image</th>
          <th className="p-2">Username</th>
          <th className="p-2">Email</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {usersData?.map((user) => (
          <tr key={user._id} className="border-t border-gray-300">
            <td className="p-2">
              <img
                src={user?.profilePhoto?.url}
                alt={`Profile of ${user?.username}`}
                className="w-10 h-10 rounded-full mx-auto"
              />
            </td>
            <td className="p-2">{user?.username}</td>
            <td className="p-2">{user?.email}</td>
            <td className="p-2 space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDeleteUser(user?._id)}
              >
                Delete
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <Link target="_blanck" to={`/profile/${user?._id}`}>
                  View Profile
                </Link>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {deleteProfile && (
        <DeleteUser
          deleteProfile={deleteProfile}
          setDeleteProfile={setDeleteProfile}
          id={deleteProfileId}
        />
      )}
    </table>
  );
};

export default UsersTable;
