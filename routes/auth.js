const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(protect, getMe);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:token").put(resetPassword);

module.exports = router;
