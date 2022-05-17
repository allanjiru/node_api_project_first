const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  register,
  login,
  user,
  forgotpassword,
} = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/user').get(protect, user);
router.route('/forgotpassword').post(forgotpassword);

module.exports = router;
