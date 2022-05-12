var multer = require('multer');
var path = require('path');

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.mimetype);
    if (!ext.startsWith('image')) {
      cb(new ErrorResponse(`This file is not an image!`, 404));
      return;
    }
    cb(null, true);
  },
});
