const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const APIFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Models) =>
  catchAsync(async (req, res, next) => {
    const doc = await Models.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("document not found with that ID", 404));
    }
    res.status(204).json({
      status: "succes",
      data: null,
    });
  });

exports.updateOne = (Models) =>
  catchAsync(async (req, res, next) => {
    const doc = await Models.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("doc not found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      doc,
    });
  });

exports.createOne = (Models) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Models.create(req.body);
    res.status(201).json({
      status: "succes",
      data: {
        newDoc,
      },
    });
  });

exports.getOne = (Models, popOption) =>
  catchAsync(async (req, res, next) => {
    let query = Models.findById(req.params.id);
    if (popOption) query = query.populate(popOption);
    const doc = await query;
    if (!doc) {
      return next(new AppError("doc not found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Models) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const newFeature = new APIFeatures(Models.find(filter), req.query)
      .filter()
      .sort()
      .limitField()
      .paginate();
    const doc = await newFeature.query;
    res.status(200).json({
      status: "success",
      result: doc.length,
      data: {
        doc,
      },
    });
  });
