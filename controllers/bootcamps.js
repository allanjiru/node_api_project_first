const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async')
// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  try {
    let bootcamps = await Bootcamp.find();
    res.status(200).json({ success: true, data: bootcamps });
  } catch (error) {}
});

// @desc        Get single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public
exports.singleBootcamp = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  try {
    let bootcamp = await Bootcamp.findById(id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
});

// @desc        Create a bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private
exports.createBootcamps = asyncHandler(async (req, res, next) => {
  try {
    let bootcamp = await Bootcamp.create(req.body);
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
});

// @desc        Update a bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  try {
    let bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
});

// @desc        Delete a bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private
exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  try {
    let bootcamp = await Bootcamp.findByIdAndDelete(id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${id}`, 404)
      );
    }
    res.status(203).json({ success: true, msg: `Bootcamp deleted` });
  } catch (error) {
    next(error);
  }
});
