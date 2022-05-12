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
const Bootcamp = require('../models/Bootcamp');

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(createBootcamps);
router
  .route('/:id')
  .put(updateBootcamps)
  .delete(deleteBootcamps)
  .get(singleBootcamp);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/:bootcamp/courses').get(getCourses);
router.route('/:id/photo').post(uploadImageBootcamp);

module.exports = router;
