import { Link } from "react-router-dom";
import Category from "../../components/category/Category";
import PostItem from "../../components/post/PostItem";
import { useDispatch, useSelector } from "react-redux";
import { getLatestPosts } from "../../redux/slices/postSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  console.log(posts);
  useEffect(() => {
    dispatch(getLatestPosts());
  }, [dispatch]);
  return (
    <>
      <section className="home min-h-screen">
        <div className="hero-section container mx-auto p-4">
          <div className="bg-gray-800 p-8 rounded-lg">
            <h1 className="text-3xl font-bold text-white mb-4 italic">
              Welcome to our Blog
            </h1>
            <p className="text-white">
              Discover a world of insightful articles and engaging content that
              will spark your curiosity and inspire your journey.
            </p>
            <Link
              to="/post"
              href="#explore"
              className="mt-4 bg-white text-gray-800 px-6 py-2 rounded-full inline-block hover:bg-gray-900 hover:text-white transition duration-300"
            >
              Explore Now
            </Link>
          </div>
        </div>
        {/* ////// */}
        <div className="container mx-auto  rounded-lg my-12">
          <h1 className="text-2xl font-bold px-3  py-4 ">Latest blogs</h1>
          <div className="flex flex-wrap flex-col-reverse my-5 md:flex-row ">
            <div className="  grid grid-cols-1 mx-auto   md:grid-cols-2 gap-4">
              {posts && posts.length > 0 ? (
                <PostItem posts={posts} />
              ) : (
                <p>No posts available</p>
              )}
            </div>
            <Category />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
