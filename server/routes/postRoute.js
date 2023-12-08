const {
  createPostCtrl,
  getAllPostsCtrl,
  getSinglePostCtrl,
  getCountPostCtrl,
  deletePostCtrl,
  updatePostCtrl,
  postPhotoCtrl,
  toggleLikeCtrl,
  getLatestPostsCtrl,
} = require("../controllers/postController");
const validateObjectId = require("../middlewares/validateObjectId");

const router = require("express").Router();
const upload = require("../middlewares/uploadPhoto");
const verifyToken = require("../middlewares/verifyToken");
const VerifyTokenOrAdmin = require("../middlewares/VerifyTokenOrAdmin");

//  api/posts/create
router.post("/create", verifyToken, upload.single("image"), createPostCtrl);

//  api/posts/:id
router
  .get("/:id", validateObjectId, verifyToken, getSinglePostCtrl)
  .put("/:id", validateObjectId, verifyToken, updatePostCtrl)
  .delete("/:id", validateObjectId, verifyToken, deletePostCtrl);

//  api/posts/count
router.get("/count/all", getCountPostCtrl);

//  api/posts/latest
router.get("/latest/four", getLatestPostsCtrl);

//  api/posts/
router.get("/", verifyToken, getAllPostsCtrl);

// /api/posts/upload
router.put(
  "/upload/:id",
  validateObjectId,
  verifyToken,
  upload.single("image"),
  postPhotoCtrl
);

// /api/posts/like/:id
router.put("/like/:id", validateObjectId, verifyToken, toggleLikeCtrl);

module.exports = router;
