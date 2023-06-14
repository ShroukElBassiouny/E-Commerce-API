const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const brandRoutes = require("./routes/brandRoutes");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMeddleware");
const productRoutes = require("./routes/productRoutes");
require("./config/db");

dotenv.config({ path: "./config.env" });

// express app
const app = express();

// Middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode:${process.env.NODE_ENV}`);
}

// Mount routes
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/subcategories", subcategoryRoutes);
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/products", productRoutes);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

//Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Sever is up on port: ${PORT}`);
});

// Handling rejections outside express
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection Error:${err.name}|${err.message}`);
  server.close(() => {
    console.error("Shutting down....");
    process.exit(1);
  });
});
