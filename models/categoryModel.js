const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Category required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short Category name"],
      maxlengtht: [32, "Too long Category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
