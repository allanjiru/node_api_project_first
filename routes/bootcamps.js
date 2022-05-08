const express = require('express');
const {
  getBootcamps,
  singleBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getBootcampsInRadius,
} = require('../controllers/bootcamps');
const { getCourses } = require('../controllers/course');
const router = express.Router();

router.route('/').get(getBootcamps).post(createBootcamps);
router
  .route('/:id')
  .put(updateBootcamps)
  .delete(deleteBootcamps)
  .get(singleBootcamp);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/:bootcamp/courses').get(getCourses);

module.exports = router;
