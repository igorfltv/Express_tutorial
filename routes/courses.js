const router = require("express").Router({ mergeParams: true });
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/courses");

router
  .route("/")
  .get(getCourses)
  .post(createCourse);
router
  .route("/:id")
  .get(getCourseById)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
