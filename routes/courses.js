const router = require("express").Router({ mergeParams: true });
const { getCourses } = require("../controllers/courses");

router.route("/").get(getCourses);
// router.route("/:bootcampId/cources").get(getCourses);

module.exports = router;
