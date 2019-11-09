// @desc    Get all Bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200);
  res.send({ success: true, msg: "List Bootcamps" });
};
``
// @desc    Get a single Bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res.status(200);
  res.send({ success: true, msg: "Get Bootcamp" });
};

// @desc    Create new Bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = (req, res, next) => {
  res.status(200);
  res.send({ success: true, msg: "Create new Bootcamp" });
};

// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200);
  res.send({ success: true, msg: `Update Bootcamp ${req.params.id}` });
};

// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200);
  res.send({ success: true, msg: `Delete Bootcamp ${req.params.id}` });
};
