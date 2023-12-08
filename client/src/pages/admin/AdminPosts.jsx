import Aside from "../../components/admin/Aside";
import PostsTable from "../../components/admin/Posts";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { useEffect } from "react";
import { getAllPosts } from "../../redux/slices/postSlice";

const AdminPosts = () => {
  const dispatch = useDispatch();
  const { loading, posts } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  return (
    <>
      <section className="flex">
        {loading === "loading" ? <Loader /> : <></>}

        <Aside />
        <PostsTable postsData={posts} />
      </section>
    </>
  );
};

export default AdminPosts;
