import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPosts } from "../../redux/slices/postSlice";
import { addPost } from "../../redux/slices/profileSlice";

// import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../redux/slices/categoriesSlice";
const CreatePost = ({ createPost, setCreatePost }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const photoRef = useRef(null);
  // const navigate = useNavigate();
  const categoryRef = useRef(null);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("image", photoRef.current.files[0]);
    formData.append("category", categoryRef.current.value);

    try {
      dispatch(createPosts({ formData, addPost }));
    } catch (error) {
      console.log(error);
    }

    titleRef.current.value = "";
    descriptionRef.current.value = "";
    photoRef.current.value = null;
    categoryRef.current.value = ""; // Reset category
    setPhotoPreview(null);
    setCreatePost(!createPost);
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50 z-50 ">

      <div className="modal-container bg-white  md:w-1/2 p-6 rounded shadow-lg max-h-screen overflow-y-scroll  ">
        <button
          className="cursor-pointer w-full text-end"
          title="close"
          onClick={() => setCreatePost(!createPost)}
        >
          <span className="material-symbols-outlined text-2xl font-bold ">
            close
          </span>
        </button>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">Title:</span>
            <input
              type="text"
              ref={titleRef}
              className="form-input p-2  mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Description:</span>
            <textarea
              ref={descriptionRef}
              className="form-input p-2  mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Category:</span>
            <select
              ref={categoryRef}
              className="form-select p-2  mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              {categories.map((category, index) => (
                <option key={index} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Upload Photo:</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              ref={photoRef}
              className="form-input  p-2 mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </label>
          {photoPreview && (
            <div className="mb-4">
              <p className="font-bold">Photo Preview:</p>
              <img
                src={photoPreview}
                alt="Preview"
                className="w-full max-h-56"
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
