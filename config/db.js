const mongoose = require('mongoose');
const DBConnect = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => {
      console.log('Db connected!');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = DBConnect;
