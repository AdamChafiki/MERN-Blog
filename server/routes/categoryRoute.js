const router = require("express").Router();
const {
  createCategoryCtrl,
  getAllCategoryCtrl,
  deleteCategoryCtrl,
  updateCategoryCtrl,
} = require("../controllers/categoryController");
const verifyIsAdmin = require("../middlewares/verifyIsAdmin");
const verifyToken = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");

// api/category
router
  .route("/")
  .post(verifyToken, verifyIsAdmin, createCategoryCtrl)
  .get(verifyToken, getAllCategoryCtrl);

// api/category/:id
router
  .route("/:id")
  .delete(validateObjectId, verifyToken, verifyIsAdmin, deleteCategoryCtrl)
  .put(validateObjectId, verifyToken, verifyIsAdmin, updateCategoryCtrl);

module.exports = router;
