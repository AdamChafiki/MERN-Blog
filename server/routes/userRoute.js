const router = require("express").Router();
const { updatePostCtrl } = require("../controllers/postController");
const {
  getAllUsersCtrl,
  getUserProfileCtrl,
  getUserCountCtrl,
  porfilePhotoCtrl,
  deleteUserProfileCtrl,
  updateUserProfileCtrl,
} = require("../controllers/usersController");
const VerifyTokenOrAdmin = require("../middlewares/VerifyTokenOrAdmin");
const upload = require("../middlewares/uploadPhoto");
const validateObjectId = require("../middlewares/validateObjectId");
const verfiyOnlyCurrentUser = require("../middlewares/verfiyOnlyCurrentUser");
const verifyIsAdmin = require("../middlewares/verifyIsAdmin");
const verifyToken = require("../middlewares/verifyToken");

//  api/users/profile
router.get("/profile", verifyToken, verifyIsAdmin, getAllUsersCtrl);

//  api/users/profile/:id
router
  .route("/profile/:id")
  .get(validateObjectId, verifyToken, getUserProfileCtrl)
  .delete(
    validateObjectId,
    verifyToken,
    VerifyTokenOrAdmin,
    deleteUserProfileCtrl
  )
  .put(
    validateObjectId,
    verifyToken,
    verfiyOnlyCurrentUser,
    updateUserProfileCtrl
  );

//  api/users/count
router.get("/count", verifyToken, verifyIsAdmin, getUserCountCtrl);

//  api/users/profile/photo
router.post(
  "/profile/photo",
  verifyToken,
  upload.single("image"),
  porfilePhotoCtrl
);

module.exports = router;
