//Express
const express = require('express');
const app = express();

//dotenv
const dotenv = require('dotenv');

//Middleware
const errorHandler = require('./middleware/error');

const DBConnect = require('./config/db');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Bootcamp route
const bootcampsRoute = require('./routes/bootcamps');
//Course route
const courseRoute = require('./routes/course');
//Auth route
const authRoute = require('./routes/auth');

const fs = require('fs');
//created uploads folder if not present
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

//express-fileupload
// const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

//Mount Routers
app.use('/api/v1/bootcamps', bootcampsRoute);
app.use('/api/v1/courses', courseRoute);
app.use('/api/v1/auth', authRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

DBConnect();
const server = app.listen(PORT, (req, res) => {
  `SERVER IS RUNNING ON PORT ${PORT}`;
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
