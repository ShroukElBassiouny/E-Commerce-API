const mongoose = require("mongoose");

const productschema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      require: [true, "Product is required"],
      unique: [true, "Product must be unique"],
      minlength: [3, "Too short Product name"],
      maxlengtht: [100, "Too long Product name"],
    },
    slug: {
      type: String,
      require: true,
      lowercase: true,
    },
    description: {
      type: String,
      require: [true, "Product description is required"],
      minlength: [20, "Too short Product description"],
    },
    quantity: {
      type: Number,
      require: [true, "Product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      require: [true, "Product price is required"],
      trim: true,
      max: [20000, "Too long Price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      type: String,
      require: [true, "Image Cover is required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      require: [true, "Product must be belong to Category"],
    },
    subcategories: {
      type: mongoose.Schema.ObjectId,
      ref: "SubCategory",
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
    },
    ratingquantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//momgoose query middleware
productschema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name -_id",
  });
});

module.exports = mongoose.model("Product", productschema);
