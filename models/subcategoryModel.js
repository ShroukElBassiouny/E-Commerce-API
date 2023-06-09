const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: [true, "SubCategory required"],
      unique: [true, "SubCategory must be unique"],
      minlength: [2, "Too short SubCategory name"],
      maxlengtht: [32, "Too long SubCategory name"],
    },
    slug: {
      type: String,
      require: true,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      require: [true, "SubCategory must be belong to Main Category"],
    },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subcategorySchema);
