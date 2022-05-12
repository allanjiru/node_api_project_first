const Course = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc        Get courses
// @route       GET /api/v1/courses
// @route       GET /api/v1/bootcamps/:bootcamp/courses
// @access      Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc        Get course
// @route       GET /courses/:id
// @access      Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  try {
    let id = req.params.id;
    const course = await Course.findById(id).populate({
      path: 'bootcamp',
      select: 'name description',
    });
    if (!course) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
});

// @desc        Update course
// @route       PUT /api/v1/courses/:id
// @access      Public
exports.updateCourse = asyncHandler(async (req, res, next) => {
  try {
    let id = req.params.id;
    const course = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    if (!course) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
});

// @desc        Delete course
// @route       DELETE /api/v1/courses/:id
// @access      Public
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  try {
    let id = req.params.id;
    const course = await Course.findById(id);
    if (!course) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${id}`, 404)
      );
    }
    course.remove();
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

// @desc        Add course
// @route       POST /api/v1/courses
// @access      Public
exports.addCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.create(req.body);
  res.status(200).json({ success: true, data: course });
});
