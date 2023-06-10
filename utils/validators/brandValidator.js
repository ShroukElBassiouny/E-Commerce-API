const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getBrandValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Brand id format")
    .notEmpty()
    .withMessage("Brand id required"),
  validatorMiddleware,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand required")
    .isLength({ min: 2 })
    .withMessage("Too short Brand name")
    .isLength({ max: 32 })
    .withMessage("Too long Brand name"),
  validatorMiddleware,
];

exports.updateBrandValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Brand id format")
    .notEmpty()
    .withMessage("Brand id required"),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Brand id format")
    .notEmpty()
    .withMessage("Brand id required"),
  validatorMiddleware,
];
