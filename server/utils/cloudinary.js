const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });

    return result;
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};
const deleteImageToCloudinary = async (imagePublic) => {
  console.log("deletettttt");
  try {
    if (!imagePublic) {
      throw new Error("Missing required parameter - public_id");
    }

    const result = await cloudinary.uploader.destroy(imagePublic);

    return result;
  } catch (error) {
    console.error("Image deletion error:", error);

    // Include the original error message
    const errorMessage =
      error.message || "Failed to delete image from Cloudinary";
    throw new Error(errorMessage);
  }
};

const deleteMultipleImageToCloudinary = async (publicIds) => {
  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    console.error("Image deletion error:", error);
    throw new Error("Failed to delete images from Cloudinary");
  }
};

module.exports = {
  uploadImageToCloudinary,
  deleteImageToCloudinary,
  deleteMultipleImageToCloudinary,
};
