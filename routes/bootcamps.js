const router = require("express").Router();
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  deleteBootcamp,
  updateBootcamp,
  getBootcampsInRadius
} = require("../controllers/bootcamps");

// Other routers
const courseRouter = require("./courses");

router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
router
  .route("/")
  .get(getBootcamps)
  .post(createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
