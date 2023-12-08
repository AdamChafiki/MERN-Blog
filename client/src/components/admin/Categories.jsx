import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../redux/slices/categoriesSlice";
import Loader from "../loader/Loader";
import UpdateCategory from "./UpdateCategory";
import { useState } from "react";

const CategoriesTable = ({ categoriesData }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.categories);
  const [onUpdateCategory, setOnUpdateCategory] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const handleUpdateCategory = (id) => {
    setOnUpdateCategory(true);
    setUpdateId(id);
  };

  return (
    <table className="w-full border-collapse border border-gray-300">
      {loading === "loading" ? <Loader /> : <></>}
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">#</th>
          <th className="p-2">Title</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {categoriesData.map((category, index) => (
          <tr key={index} className="border-t border-gray-300">
            <td className="p-2">{index + 1}</td>
            <td className="p-2">{category.title}</td>
            <td className="p-2 space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => dispatch(deleteCategory(category._id))}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleUpdateCategory(category._id)}
              >
                Update
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {onUpdateCategory && (
        <UpdateCategory
          id={updateId}
          setOnUpdateCategory={setOnUpdateCategory}
          onUpdateCategory={onUpdateCategory}
        />
      )}
    </table>
  );
};

export default CategoriesTable;
