const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { register, login, user } = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/user').post(protect, user);

module.exports = router;
