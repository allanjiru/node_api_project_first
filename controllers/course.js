const Course = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc        Get courses
// @route       GET /api/v1/courses
// @route       GET /api/v1/bootcamps/:bootcamp/courses
// @access      Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  try {
    let query;
    if (req.params.bootcamp) {
      query = await Course.find({ bootcamp: req.params.bootcamp }).populate(
        'bootcamp'
      );
    } else {
      query = await Course.find().populate('bootcamp');
    }
    return res
      .status(200)
      .json({ success: true, count: query.length, data: query });
  } catch (error) {
    next(error);
  }
});

// @desc        Get course
// @route       GET /api/v1/courses/:id
// @access      Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  try {
    let id = req.params.id;
    const course = await Course.findById(id);
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
});
