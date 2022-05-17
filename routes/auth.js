const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  register,
  login,
  logout,
  user,
  forgotpassword,
  resetpassword,
  updatedetails,
  updatepassword,
} = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/user').get(protect, user);
router.route('/forgotpassword').post(forgotpassword);
router.route('/resetpassword/:resetToken').put(resetpassword);
router.route('/updatedetails').put(protect, updatedetails);
router.route('/updatepassword').put(protect, updatepassword);

module.exports = router;
