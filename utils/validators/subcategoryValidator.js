const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require('../../models/categoryModel')

exports.getSubCategoryValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Subcategory id format")
    .notEmpty()
    .withMessage("SubCategory id required"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory name"),
  check("category")
    .notEmpty()
    .withMessage("Category id required")
    .isMongoId()
    .withMessage("Invalid category id format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      })
    ),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Subcategory id format")
    .notEmpty()
    .withMessage("SubCategory id required"),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Subcategory id format")
    .notEmpty()
    .withMessage("SubCategory id required"),
  validatorMiddleware,
];
