const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const categoryRoutes = require("./routes/categoryRoutes");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMeddleware");
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
app.use("/api/v1", categoryRoutes);

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
