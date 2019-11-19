const router = require("express").Router({ mergeParams: true });
const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser
} = require("../controllers/users");

const User = require("../models/User");

const advancedResults = require("../middleware/filtering");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);
router.use(authorize("admin"));

router
  .route("/")
  .get(advancedResults(User), getUsers)
  .post(createUser);
router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
