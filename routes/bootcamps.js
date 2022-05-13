const express = require('express');
const {
  getBootcamps,
  singleBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getBootcampsInRadius,
  uploadImageBootcamp,
} = require('../controllers/bootcamps');
const { getCourses } = require('../controllers/course');
const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');
const Bootcamp = require('../models/Bootcamp');

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamps);
router
  .route('/:id')
  .put(protect, authorize('publisher', 'admin'), updateBootcamps)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamps)
  .get(singleBootcamp);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/:bootcamp/courses').get(getCourses);
router
  .route('/:id/photo')
  .post(protect, authorize('publisher', 'admin'), uploadImageBootcamp);

module.exports = router;
