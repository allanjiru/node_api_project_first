const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Please add a course title'],
      minlength: [3, 'Name should be at least 3 characters'],
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please add a course description'],
      maxlength: [500, 'Description can not be more than 500 characters'],
    },
    weeks: {
      type: String,
      required: true,
    },
    tuition: {
      type: String,
      required: [true, 'Please add tuition cost'],
    },
    minimumSkill: {
      type: String,
      required: [true, 'Please add a minimum skill'],
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    scholarhipsAvailable: {
      type: Boolean,
      default: false,
    },
    bootcamp: {
      type: Schema.Types.ObjectId,
      ref: 'Bootcamp',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
