const express = require("express");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryServices");

const subcategoriesRoute = require("./subcategoryRoutes");

const router = express.Router();

router
  .route("/categories")
  .get(getCategories)
  .post(createCategoryValidator, createCategory);
router
  .route("/categories/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);
router.use("/categories/:categoryId", subcategoriesRoute);

module.exports = router;
