const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//config dotenv
dotenv.config({ path: './config/config.env' });

//load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');
const Review = require('./models/Review');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI);

//read json files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

//import json files into DB
const importToDB = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await Review.create(reviews);
    await User.create(users);
    console.log('Data imported ...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

//delete from DB
const deleteDataDB = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    console.log('Data deleted ...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

if (process.argv[2] === '-i') {
  importToDB();
} else if (process.argv[2] === '-d') {
  deleteDataDB();
}
