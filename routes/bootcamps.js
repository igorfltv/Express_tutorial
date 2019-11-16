const router = require("express").Router();
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  deleteBootcamp,
  updateBootcamp,
  getBootcampsInRadius,
  uploadPhoto
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/filtering");

// Other routers
const courseRouter = require("./courses");
const { protect } = require("../middleware/auth");

router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);
router.route("/:id/photo").put(protect, uploadPhoto);

module.exports = router;
