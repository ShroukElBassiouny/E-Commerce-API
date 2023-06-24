const SubCategory = require("../models/subcategoryModel");
const factory = require("./handlersFactory");

// @desc    Create Subcategory on specific category
// @route   POST  /api/v1/categories/categoryId/subcategories
// @access  Private
// Nested rute (create)
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// @desc    Create Subcategory
// @route   POST  /api/v1/subcategories/
// @access  Private
exports.createSubCategory = factory.createOne(SubCategory);

// @desc    Get list of Subcategories for specific category
// @route   GET /api/v1/categories/:categoryId/subcategories
// @access  Public
// Nested rute (get)
exports.createFilterObj = (req, res, next) => {
  let fliterObject = {};
  if (req.params.categoryId) fliterObject = { category: req.params.categoryId };
  req.fliterObject = fliterObject;
  next();
};

// @desc    Get list of Subcategories
// @route   GET /api/v1/subcategories/
// @access  Public
exports.getSubCategories = factory.getAll(SubCategory);

// @desc    Get specific Subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategory = factory.getOne(SubCategory);

// @desc    Update specific Subcategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = factory.updateOne(SubCategory);

// @desc    Delete specific Subcategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);
