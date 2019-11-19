const crypto = require("crypto");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const mailer = require("../utils/sendEmail");
const asyncHandler = require("../middleware/async");
const STATUS_CODES = require("http-response-status-code");

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //   Create user

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  // Create token

  sendTokenResponse(user, STATUS_CODES.OK, res);
});

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //   Validate

  if (!email || !password) {
    return next(
      new ErrorResponse(
        "Please provide an email and password",
        STATUS_CODES.BAD_REQUEST
      )
    );
  }

  // Check for user

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorResponse("Invalid credentials", STATUS_CODES.UNAUTHORIZED)
    );
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(
      new ErrorResponse("Invalid credentials", STATUS_CODES.UNAUTHORIZED)
    );
  }

  // Create token

  sendTokenResponse(user, STATUS_CODES.OK, res);
});

// @desc    Current logged in user
// @route   POST /api/v1/auth/register
// @access  Private
exports.getMe = asyncHandler(async (req, res, nex) => {
  const user = await User.findById(req.user.id);

  res.status(STATUS_CODES.OK).json({ success: true, data: user });
});

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, nex) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate);

  res.status(STATUS_CODES.OK).json({ success: true, data: user });
});

// @desc    Update password
// @route   PUT /api/v1/auth/pdatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, nex) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check current password

  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(
      new ErrorResponse("Wrong password!", STATUS_CODES.UNAUTHORIZED)
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, STATUS_CODES.OK, res);
});

// @desc    Forgot Password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, nex) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("There is no user", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //Create resetURL
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `Make a request: \n\n ${resetUrl}`;

  try {
    await mailer({
      email: user.email,
      subject: "Password Reset for DevCamp",
      message
    });
    res.status(STATUS_CODES.OK).json({ success: true, data: "Email sent" });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiration = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

// @desc    Current logged in user
// @route   PUT /api/v1/auth/forgotpassword/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, nex) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpiration: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse("Invalid token", STATUS_CODES.BAD_REQUEST));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiration = undefined;

  await user.save();

  sendTokenResponse(user, STATUS_CODES.OK, res);
});

// get token, create cookie and send response

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      token,
      success: true
    });
};
