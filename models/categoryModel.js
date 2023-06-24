const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: [true, "Category required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short Category name"],
      maxlengtht: [32, "Too long Category name"],
    },
    slug: {
      type: String,
      require: true,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
