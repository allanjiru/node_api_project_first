const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
// const match = require('nodemon/lib/monitor/match');
// const { param } = require('../routes/bootcamps');

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;
  //copy req.query
  let reqQuery = { ...req.query };
  //Fields to execute
  const removeFields = ['select', 'sort'];
  //loop over removeFields and delete them from query
  removeFields.forEach((param) => delete reqQuery[param]);
  //Create Query String
  let queryStr = JSON.stringify(req.query);
  //Create Operators ($gt, $gte, $lt, $lte, $in)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  try {
    //Finding Resource
    query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments();
    query = query.skip(startIndex).limit(limit);

    //Execute query
    let bootcamps = await query;

    //Pagination Result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
      pagination: pagination,
    });
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
    let bootcamp = await Bootcamp.findById(id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${id}`, 404)
      );
    }
    await bootcamp.remove();
    res.status(203).json({ success: true, msg: `Bootcamp deleted` });
  } catch (error) {
    next(error);
  }
});

// @desc        Get bootcamp within a radius
// @route       GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access      Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  let { zipcode, distance } = req.params;
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const long = loc[0].longitude;

  // calc radius using radians
  // Divide dist by radius of earth
  // Earth radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[long, lat], radius] } },
  });

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});
