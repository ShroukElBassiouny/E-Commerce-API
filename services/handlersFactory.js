const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) => {
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`No ${Model} for this id ${id}`, 404));
    }
    res.status(204).send();
  });
};

exports.updateOne = (Model) => {
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(
        new ApiError(`No ${Model} for this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: document });
  });
};

exports.createOne = (Model) => {
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });
};

exports.getOne = (Model) => {
  asyncHandler(async (req, res, next) => {
    const document = await Model.findById(req.params.id);
    if (!document) {
      return next(
        new ApiError(`No ${Model} for this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: document });
  });
};

exports.getAll = (Model, ModelName = "") => {
  asyncHandler(async (req, res) => {
    let fliter = {};
    if (req.fliterObject) {
      fliter = req.fliterObject;
    }
    const countdocument = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(fliter), req.query)
      .paginate(countdocument)
      .filter()
      .limitFields()
      .search(ModelName)
      .sort();

    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;
    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });
};
