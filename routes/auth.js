const router = require("express").Router();
const { registerUser } = require("../controllers/auth");

router.route("/register").post(registerUser);

module.exports = router;
