const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minlength: [2, "Too short Brand name"],
      maxlengtht: [32, "Too long Brand name"],
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

module.exports = mongoose.model("Brand", brandSchema);
