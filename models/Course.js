const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: title,
    required: [true, "Please add title"]
  },
  description: {
    type: String,
    required: [true, "Please add description"]
  },
  weeks: {
    type: String,
    required: [true, "Please add number of weeks"]
  },
  tuition: {
    type: Number,
    required: [true, "Please add a cost"]
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add a skill"]
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: DataCue,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true
  }
});

module.exports = mongoose.model("Course", CourseSchema);
