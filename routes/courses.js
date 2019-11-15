const router = require("express").Router({ mergeParams: true });
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/courses");

const Course = require("../models/Course");
const advancedResults = require("../middleware/filtering");

router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description"
    }),
    getCourses
  )
  .post(createCourse);
router
  .route("/:id")
  .get(getCourseById)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
