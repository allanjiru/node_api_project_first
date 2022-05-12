const express = require('express');
const {
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  addCourse,
} = require('../controllers/course');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const Course = require('../models/Course');

router
  .route('/')
  .get(
    advancedResults(Course, { path: 'bootcamp', select: 'name description' }),
    getCourses
  )
  .post(addCourse);
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
