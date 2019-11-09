const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200);
  res.send({ success: true, msg: "List Bootcamps" });
});

router.get("/:id", (req, res) => {
  res.status(200);
  res.send({ success: true, msg: "Get Bootcamp" });
});

router.post("", (req, res) => {
  res.status(201);
  res.send({ success: true, msg: "Create new Bootcamp" });
});

router.put("/:id", (req, res) => {
  res.status(200);
  res.send({ success: true, msg: `Update Bootcamp ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.status(200);
  res.send({ success: true, msg: `Delete Bootcamp ${req.params.id}` });
});

module.exports = router;
