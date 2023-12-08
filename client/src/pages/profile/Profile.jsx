import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PhotoUploadModal from "../../components/profile/UpdatePhotoModal";
import UpdateProfileModal from "../../components/profile/UpdateProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileById } from "../../redux/slices/profileSlice";
import CreatePost from "../../components/post/CreatePost";
import PostItem from "../../components/post/PostItem";
import Loader from "../../components/loader/Loader";
import DeleteProfile from "../../components/profile/DeleteProfile";
const Profile = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.profile);
  const cuurentUser = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.posts);

  const [updatePhoto, setUpdatePhoto] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);

  const [createPost, setCreateProst] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchUserProfileById(id));
  }, [dispatch, id]);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <section className="profile py-12">
        {loading === "loading" ? <Loader /> : <></>}

        <div className="profile_header container mx-auto p-2 bg-gray-800 rounded-lg">
          <div className="profile_image_wrapper relative ">
            <img
              src={user.profilePhoto?.url}
              alt="profile"
              className="w-44 h-44 ring-2 ring-white rounded-full mx-auto"
            />
            {cuurentUser.user?._id === user?._id && (
              <button
                className="absolute bottom-0 bg-green-500 right-[35%] md:right-[43%] ring-2 ring-white text-white p-2 w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setUpdatePhoto(!updatePhoto)}
              >
                <span className="material-symbols-outlined ">add_a_photo</span>
              </button>
            )}
          </div>
          <div className="profile_info mt-5 flex items-center flex-col space-y-5">
            <h1 className="text-3xl text-white font-bold">{user.username}</h1>
            <p className="bio text-white text-md font-semibold">
              {user?.bio ? user.bio : "no bio"}
            </p>
            <p className="text-white text-sm font-semibold">
              Date joined: {new Date(user.createdAt).toDateString()}
            </p>
          </div>
          <div className="profile_action flex justify-center space-x-3 mt-5">
            {cuurentUser.user?._id === user?._id && (
              <>
                <button
                  className="bg-green-500 text-white rounded p-2"
                  onClick={() => setUpdateProfile(!updateProfile)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white rounded p-2"
                  onClick={() => setDeleteProfile(!deleteProfile)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-blue-100 p-2 rounded-md"
                  onClick={() => setCreateProst(!createPost)}
                >
                  Add Post
                </button>
              </>
            )}
          </div>
        </div>
        <div className="profile_post my-12 container mx-auto">
          <h1 className="text-2xl mb-5 text-center font-extralight border-b-2 border-gray-600 w-1/2 mx-auto italic">
            {`${user?.username}'s Posts`}
          </h1>

          <div className=" flex items-center flex-wrap gap-4 space-y-4">
            {user?.posts && user?.posts.length > 0 ? (
              <PostItem posts={user.posts} />
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
        {updatePhoto ? (
          <PhotoUploadModal
            updatePhoto={updatePhoto}
            setUpdatePhoto={setUpdatePhoto}
          />
        ) : (
          ""
        )}
        {updateProfile ? (
          <UpdateProfileModal
            updateProfile={updateProfile}
            setUpdateProfile={setUpdateProfile}
          />
        ) : (
          ""
        )}
        {createPost ? (
          <CreatePost createPost={createPost} setCreatePost={setCreateProst} />
        ) : (
          ""
        )}
        {deleteProfile ? (
          <DeleteProfile
            deleteProfile={deleteProfile}
            setDeleteProfile={setDeleteProfile}
          />
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default Profile;
