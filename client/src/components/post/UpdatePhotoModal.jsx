import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePostImage } from "../../redux/slices/postSlice";
import Loader from "../loader/Loader";

const PhotoUploadModal = ({ updatePhoto, setUpdatePhoto, id }) => {
  const photoRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", photoRef.current.files[0]);

    dispatch(updatePostImage({ formData, id, setUpdatePhoto }));

    photoRef.current.value = null;
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
      {loading === "loading" ? <Loader /> : <></>}

      <div className="modal-container bg-white w-1/2 p-6 rounded shadow-lg">
        <button
          className="cursor-pointer w-full text-end"
          title="close"
          onClick={() => setUpdatePhoto(!updatePhoto)}
        >
          <span className="material-symbols-outlined text-2xl font-bold ">
            close
          </span>
        </button>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">Upload Photo:</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              ref={photoRef}
              className="form-input p-2 mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
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
            Upload Photo
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhotoUploadModal;
