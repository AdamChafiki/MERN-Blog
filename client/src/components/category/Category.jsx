import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategories } from "../../redux/slices/categoriesSlice";

const Category = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="ml-4 flex-1 p-2">
      <h1 className="text-xl font-bold mb-4">Categories</h1>
      <ul className="pl-4 flex flex-col space-y-4">
        {categories.map((category) => (
          <li key={category._id}>
            <Link
              to={`/post/categories/${category.title}`}
              className="text-gray-800 hover:underline"
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
