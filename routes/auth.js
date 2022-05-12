const express = require('express');
const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const User = require('../models/User');

const { register } = require('../controllers/auth');

router.route('/register').post(register);

module.exports = router;
