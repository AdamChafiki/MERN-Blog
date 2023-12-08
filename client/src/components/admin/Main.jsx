import { useEffect, useRef } from "react";
import Analytic from "./Analytic";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getAllCategories,
  addCategoryToArrray,
} from "../../redux/slices/categoriesSlice";
import { Toaster } from "sonner";
import { getProfilesCount } from "../../redux/slices/profileSlice";
import { getPostsCount } from "../../redux/slices/postSlice";
import { getAllComments } from "../../redux/slices/commentSlice";
const Main = () => {
  const dispatch = useDispatch();
  const { loading, categories } = useSelector((state) => state.categories);
  const { loading: lp, count } = useSelector((state) => state.profile);
  const { loading: lps, count: cps } = useSelector((state) => state.posts);
  const { loading: lc, comment } = useSelector((state) => state.comments);

  const categoryInputRef = useRef();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getProfilesCount());
    dispatch(getPostsCount());
    dispatch(getAllComments());
  }, [dispatch]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    const data = { title: categoryInputRef.current.value };
    dispatch(addCategory({ data, addCategoryToArrray }));

    categoryInputRef.current.value = "";
  };

  return (
    <>
      <main className="main_admin bg-gray-500 w-full p-4">
        {loading === "loading" ? <Loader /> : <></>}
        {lp === "loading" ? <Loader /> : <></>}
        {lps === "loading" ? <Loader /> : <></>}
        {lc === "loading" ? <Loader /> : <></>}

        <Toaster richColors position="top-right" time="2" />

        <div className="categories-title text-xl font-bold mb-4">
          Welcome, Admin !
        </div>
        <div className="analytic grid grid-cols-4 gap-4">
          <Analytic
            icon={"groups"}
            title={"User"}
            count={count}
            link={"users"}
          />
          <Analytic
            icon={"full_coverage"}
            title={"Posts"}
            count={cps}
            link={"posts"}
          />
          <Analytic
            icon={"sell"}
            title={"Categories"}
            count={categories?.length}
            link={"categories"}
          />
          <Analytic
            icon={"chat"}
            title={"Comments"}
            count={comment?.length}
            link={"comments"}
          />
        </div>
        <div className="categories-add mt-6">
          <div className="category-title bg-white p-4 rounded-md">
            <form onSubmit={handleAddCategory}>
              <div className="mb-4">
                <label
                  htmlFor="categoryInput"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add Category:
                </label>
                <input
                  type="text"
                  id="categoryInput"
                  ref={categoryInputRef}
                  className="mt-1 p-2 rounded-md w-full border-2 border-gray-700"
                  placeholder="Enter category title"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-500 text-white rounded-full"
              >
                Add Category
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
