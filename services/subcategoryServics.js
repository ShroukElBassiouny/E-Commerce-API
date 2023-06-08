const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const SubCategory = require("../models/subcategoryModel");

// @desc    Create Subcategory on specific category
// @route   POST  /api/v1/categories/categoryId/subcategories
// @access  Private
exports.setCategoryIdToBody = (req,res,next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// @desc    Create Subcategory
// @route   POST  /api/v1/subcategories
// @access  Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  const { name, category } = req.body;
  const subcategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subcategory });
});

// @desc    Get list of Subcategories for specific category
// @route   GET /api/v1/categories/:categoryId/subcategories
// @access  Public
exports.createFilterObj = (req,res, next) => {
  let fliterObject = {};
  if (req.params.categoryId) fliterObject = { category: req.params.categoryId };
  req.fliterObject = fliterObject;
  next();
};
// @desc    Get list of Subcategories
// @route   GET /api/v1/subcategories
// @access  Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const subcategories = await SubCategory.find(req.fliterObject)
    .skip(skip)
    .limit(limit);
  //.populate({ path: "Category", select: "name-_id" });
  res
    .status(200)
    .json({ results: subcategories.length, page, data: subcategories });
});

// @desc    Get specific Subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategory.findById(id);
  /*.populate({
    path: "Category",
    select: "name-_id",
  });*/
  if (!subcategory) {
    return next(new ApiError(`No Subcategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
});

// @desc    Update specific Subcategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subcategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );

  if (!subcategory) {
    return next(new ApiError(`No Subcategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
});

// @desc    Delete specific Subcategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategory.findByIdAndDelete(id);

  if (!subcategory) {
    return next(new ApiError(`No Subcategory for this id ${id}`, 404));
  }
  res.status(204).send();
});
