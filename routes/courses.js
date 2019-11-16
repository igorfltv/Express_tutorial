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
const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description"
    }),
    getCourses
  )
  .post(protect, createCourse);
router
  .route("/:id")
  .get(getCourseById)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
