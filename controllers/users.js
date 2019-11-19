const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const STATUS_CODES = require("http-response-status-code");

// @desc    GET all users
// @route   GET /api/v1/auth/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(STATUS_CODES.OK).json(res.advancedResults);
});

// @desc    GET single user
// @route   GET /api/v1/auth/users/:id
// @access  Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(STATUS_CODES.OK).json({
    success: true,
    data: user
  });
});

// @desc    Create User
// @route   POST /api/v1/auth/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(STATUS_CODES.CREATED).json({
    success: true,
    data: user
  });
});

// @desc    Update User
// @route   PUT /api/v1/auth/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(STATUS_CODES.OK).json({
    success: true,
    data: user
  });
});

// @desc    Delete User
// @route   DELETE /api/v1/auth/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(STATUS_CODES.OK).json({
    success: true,
    data: {}
  });
});
