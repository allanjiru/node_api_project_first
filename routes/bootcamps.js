const express = require('express');
const {
  getBootcamps,
  singleBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getBootcampsInRadius,
} = require('../controllers/bootcamps');
const router = express.Router();

router.route('/').get(getBootcamps).post(createBootcamps);
router
  .route('/:id')
  .put(updateBootcamps)
  .delete(deleteBootcamps)
  .get(singleBootcamp);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

module.exports = router;
