import { Link } from "react-router-dom";

const PostItem = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <div
          key={post?.id}
          className="post-item p-2 w-[400px] border border-gray-300 rounded-md shadow-md"
        >
          <img
            className="max-w-56 h-56 rounded-md object-cover mx-auto"
            src={post?.postPhoto?.url}
            alt="pp"
          />
          <div className="info my-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                className="w-8 h-8 rounded-full"
                src={post?.user?.profilePhoto?.url}
                alt="profile"
              />
              <Link
                to={`/profile/${post.user.id}`}
                title={post?.user?.username}
                className="text-sm text-gray-500 font-semibold"
              >
                {post?.user?.username}
              </Link>
            </div>
            <div className="text-sm text-gray-500 font-semibold">
              <p>{new Date(post?.createdAt).toDateString()}</p>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl">{post?.title}</h1>
            <p className="overflow-hidden line-clamp-3">{post?.description}</p>
          </div>
          <Link
            to={`/post/details/${post?.id}`}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            See more
          </Link>
        </div>
      ))}
    </>
  );
};

export default PostItem;
