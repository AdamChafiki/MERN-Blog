import { useEffect, useState } from "react";
import Category from "../../components/category/Category";
import Pagination from "../../components/pagination/Pagination";
import PostItem from "../../components/post/PostItem";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByPage, getPostsCount } from "../../redux/slices/postSlice";
// import CreatePost from "../../components/post/CreatePost";

const Posts = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, count } = useSelector((state) => state.posts);

  const POST_PER_PAGE = 4;
  const pages = Math.ceil(count / POST_PER_PAGE);

  useEffect(() => {
    dispatch(getPostsCount());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPostsByPage(currentPage));
  }, [dispatch, currentPage]);

  return (
    <>
      <section className="posts min-h-screen">
        <div className="container mx-auto  rounded-lg my-12">
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
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Posts;
