const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'please provide review title'],
    },
    text: {
      type: String,
      required: [true, 'please provide review'],
    },
    rating: {
      type: Number,
      required: [true, 'please provide review rating'],
    },
    bootcamp: {
      type: Schema.Types.ObjectId,
      ref: 'Bootcamp',
      required: [true, 'please add the bootcamp you wish to review'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
