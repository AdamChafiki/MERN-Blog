import Aside from "../../components/admin/Aside";
import CategoriesTable from "../../components/admin/Categories";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { useEffect } from "react";
import { getAllCategories } from "../../redux/slices/categoriesSlice";
const AdminCategories = () => {
  const dispatch = useDispatch();
  const { loading, categories } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      <section className="flex">
        {loading === "loading" ? <Loader /> : <></>}

        <Aside />
        <CategoriesTable categoriesData={categories} />
      </section>
    </>
  );
};

export default AdminCategories;
