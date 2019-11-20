const Review = require("../models/Review");
const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const STATUS_CODES = require("http-response-status-code");

// @desc    Get all Reviews
// @route   GET /api/v1/bootcamps/:bootcampId/reviews
// @access  Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });
    return res.status(STATUS_CODES.OK).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    res.status(STATUS_CODES.OK).json(res.advancedResults);
  }
});

// @desc    Get review
// @route   GET /api/v1/reviews/:id
// @access  Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description"
  });

  if (!review) {
    return next(
      new ErrorResponse(
        `Review id:${req.params.id} not found`,
        STATUS_CODES.BAD_REQUEST
      )
    );
  }

  res.status(STATUS_CODES.OK).json({
    success: true,
    data: review
  });
});

// @desc    Post review
// @route   POST /api/v1/bootcamps/:bootcampId/reviews
// @access  Private
exports.createReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp id:${req.params.bootcampId} not found`,
        STATUS_CODES.BAD_REQUEST
      )
    );
  }

  const review = await Review.create(req.body);

  res.status(STATUS_CODES.CREATED).json({
    success: true,
    data: review
  });
});
