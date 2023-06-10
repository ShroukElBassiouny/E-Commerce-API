const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minlength: [2, "Too short Brand name"],
      maxlengtht: [32, "Too long Brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const BrandModel = mongoose.model("Brand", brandSchema);

module.exports = BrandModel;
