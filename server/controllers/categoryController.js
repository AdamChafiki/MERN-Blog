const asyncHandler = require("express-async-handler");
const {
  Category,
  validateCreateCategory,
  validateUpdateCategory,
} = require("../models/categoryModal");

/**
 * @description Create new category
 * @router /api/category
 * @method POST
 * @access private (only Admin)
 */

module.exports.createCategoryCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateCategory(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const category = await Category.create({
    user: req.user.id,
    title: req.body.title,
  });

  res.status(201).json(category);
});

/**
 * @description Get All category
 * @router /api/category
 * @method GET
 * @access private (only Admin)
 */

module.exports.getAllCategoryCtrl = asyncHandler(async (req, res) => {
  const categories = await Category.find().select("title");
  res.status(200).json(categories);
});

/**
 * @description Delete categpry by id
 * @router /api/category/:id
 * @method DELETE
 * @access private (only Admin)
 */

module.exports.deleteCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404).json(category);
  }
  await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Category has been deleted succesfully " });
});

/**
 * @description Update categpry by id
 * @router /api/category/:id
 * @method PUT
 * @access private (only Admin)
 */

module.exports.updateCategoryCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateCategory(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404).json(category);
  }
  const categoryUpdate = await Category.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
      },
    },
    { new: true }
  );
  res.status(200).json(categoryUpdate);
});
