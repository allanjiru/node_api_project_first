const express = require('express');
const {
  getBootcamps,
  singleBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
} = require('../controllers/bootcamps');
const router = express.Router();

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamps);
router
  .route('/:id')
  .put(updateBootcamps)
  .delete(deleteBootcamps)
  .get(singleBootcamp);

module.exports = router;
