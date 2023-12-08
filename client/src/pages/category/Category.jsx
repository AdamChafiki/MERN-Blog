import { useParams } from "react-router-dom";
import PostItem from "../../components/post/PostItem";
import Category from "../../components/category/Category";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByCategory } from "../../redux/slices/postSlice";
import { useEffect } from "react";

const CategoryPosts = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPostsByCategory(category));
  }, [dispatch, category]);

  return (
    <>
      <section className="posts min-h-screen">
        <div className="container mx-auto  rounded-lg my-12">
          <div className="flex flex-wrap flex-col-reverse my-5 md:flex-row ">
            <div className="  grid grid-cols-1 mx-auto w-3/4  md:grid-cols-2 gap-4">
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

export default CategoryPosts;
