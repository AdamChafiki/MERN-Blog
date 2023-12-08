const router = require("express").Router();
const {
  createCommentCtrl,
  getAllCommentsCtrl,
  DeleteCommentCtrl,
  UpdateCommentCtrl,
} = require("../controllers/commentController");
const verifyToken = require("../middlewares/verifyToken");
const verifyIsAdmin = require("../middlewares/verifyIsAdmin");
const validateObjectId = require("../middlewares/validateObjectId");

//  api/comments
router
  .route("/")
  .post(verifyToken, createCommentCtrl)
  .get(verifyToken, verifyIsAdmin, getAllCommentsCtrl);

//  api/comments/:id
router
  .route("/:id")
  .delete(validateObjectId, verifyToken, DeleteCommentCtrl)
  .put(validateObjectId, verifyToken, UpdateCommentCtrl);

module.exports = router;
