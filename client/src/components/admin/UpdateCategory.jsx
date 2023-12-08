import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../redux/slices/categoriesSlice";
import { useRef } from "react";
import Loader from "../loader/Loader";
const UpdateCategory = ({ onUpdateCategory, setOnUpdateCategory, id }) => {
  const cInp = useRef();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.categories);
  const handleUpdateCategory = (e) => {
    e.preventDefault();
    const data = { title: cInp.current.value };
    dispatch(updateCategory({ id, data }));
    setOnUpdateCategory(!onUpdateCategory);
  };

  return (
    <div className="update-category-container fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      {loading === "loading" ? <Loader /> : <></>}

      <div className="category-title bg-white p-4 rounded-md w-1/2">
        <button
          className="cursor-pointer w-full"
          onClick={() => setOnUpdateCategory(!onUpdateCategory)}
        >
          <span className="material-symbols-outlined text-2xl text-end w-full font-bold text-black">
            close
          </span>
        </button>
        <form onSubmit={handleUpdateCategory}>
          <div className="mb-4">
            <label
              htmlFor="categoryInput"
              className="block text-sm font-medium text-gray-700"
            >
              Update Category:
            </label>
            <input
              type="text"
              ref={cInp}
              id="categoryInput"
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="Enter updated category title"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-full"
          >
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
