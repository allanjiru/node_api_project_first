const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc        Register User
// @route       GET /api/v1/auth/register
// @access      Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, role, password } = req.body;
  const user = await User.create({
    name,
    email,
    role,
    password,
  });
  res.status(200).json({ success: true });
});
