const express = require('express');
const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const User = require('../models/User');

const { register, login } = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);

module.exports = router;
