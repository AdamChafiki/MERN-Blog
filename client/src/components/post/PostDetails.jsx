import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddComment from "../comment/AddComment";
import CommentList from "../comment/CommentList";
import UpdatePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import PhotoUploadModal from "./UpdatePhotoModal";
import { getPostsDetails, toggleLikePost } from "../../redux/slices/postSlice";
import DeletePostToggle from "./DeletePostToggle";

const PostDetails = () => {
  const [updatePost, setUpdatePost] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const [updatePhoto, setUpdatePhoto] = useState(false);
  const [like, setLike] = useState(null);
  const dispatch = useDispatch();
  const { loading, posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPostsDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    const number = posts?.likes?.length;
    if (number) {
      setLike(number);
    } else {
      setLike(0);
    }
  }, [posts]);

  const toggleLike = (id, e) => {
    e.preventDefault(); // Prevent the default behavior of the click event

    dispatch(toggleLikePost(id));
  };

  return (
    <>
      <div className="post_details my-12">
        {loading === "loading" ? <Loader /> : <></>}

        <div className="post-item p-2 border-gray-300 rounded-md ">
          {posts && loading === "succeeded" && posts.length !== 0 && (
            <>
              {" "}
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                <div className="top_post_details">
                  <img
                    className="rounded-md  w-full object-cover"
                    src={posts?.postPhoto?.url}
                    alt="pp"
                  />
                  <div className="info my-3  flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={posts?.user?.profilePhoto?.url}
                        alt="profile"
                      />
                      <Link
                        to={`/profile/${posts?.user?.id}`}
                        title={posts?.user?.username}
                        className="text-sm text-gray-500 font-semibold"
                      >
                        {posts?.user?.username}
                      </Link>
                    </div>
                    <div className="text-sm text-gray-500 font-semibold">
                      <p>{new Date(posts?.createdAt).toDateString()}</p>
                    </div>
                  </div>
                  {user?._id === posts?.user?._id ? (
                    <>
                      {" "}
                      <button
                        className="p-2 bg-green-500 rounded-md flex items-center space-x-3 text-green-100"
                        onClick={() => setUpdatePhoto(!updatePhoto)}
                      >
                        <span className="material-symbols-outlined">
                          photo_camera
                        </span>
                        <p>Update photo</p>
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <h1 className="font-bold text-3xl py-4">{posts?.title}</h1>
                  <p className="font-light text-xl text-gray-500 ">
                    {posts?.description}
                  </p>
                </div>
              </div>
              <div className="tools py-4 flex items-center justify-between">
                <button
                  className={
                    posts?.likes?.includes(user?._id)
                      ? "flex items-center space-x-3 text-blue-600"
                      : "flex items-center space-x-3 text-gray-600"
                  }
                  onClick={(e) => {
                    toggleLike(posts?._id, e);
                  }}
                >
                  <span className="material-symbols-outlined">thumb_up</span>
                  <span>{like}</span>
                </button>
                {user?._id === posts?.user?._id ? (
                  <>
                    {" "}
                    <div className="flex items-center space-x-3">
                      <button onClick={() => setUpdatePost(!updatePost)}>
                        <span className="material-symbols-outlined text-blue-600">
                          edit
                        </span>
                      </button>
                      <DeletePostToggle id={posts?._id} />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <AddComment id={posts?._id} />
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {posts?.comments?.length} Comments
                </h2>
                {/* To do comment for auth delete and update hh  */}
                <CommentList
                  updateComment={updateComment}
                  setUpdateComment={setUpdateComment}
                  comments={posts?.comments}
                />
              </div>
            </>
          )}

          {updatePost ? (
            <UpdatePostModal
              updatePost={updatePost}
              setUpdatePost={setUpdatePost}
              id={id}
            />
          ) : (
            ""
          )}
          {updatePhoto ? (
            <PhotoUploadModal
              updatePhoto={updatePhoto}
              setUpdatePhoto={setUpdatePhoto}
              id={id}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default PostDetails;
