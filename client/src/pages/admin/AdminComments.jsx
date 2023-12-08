import Aside from "../../components/admin/Aside";
import CommentsTable from "../../components/admin/Comments";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { useEffect } from "react";
import { getAllComments } from "../../redux/slices/commentSlice";
const AdminComments = () => {
  const dispatch = useDispatch();
  const { loading, comment } = useSelector((state) => state.comments);
  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);
  return (
    <>
      <section className="flex">
        {loading === "loading" ? <Loader /> : <></>}

        <Aside />
        <CommentsTable commentsData={comment} />
      </section>
    </>
  );
};

export default AdminComments;
