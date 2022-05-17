//Express
const express = require('express');
const app = express();

//cookieParser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

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

//express-mongo-sanitize
const expressMongoSanitize = require('express-mongo-sanitize');
app.use(expressMongoSanitize());
//set security headers(helmet)
const helmet = require('helmet');
app.use(helmet());
//prevent xss attacks
const xss = require('xss-clean');
app.use(xss());
//Rate limiting(expressRateLimit)
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limiter);
//Prevent http param pollution(hpp)
const hpp = require('hpp');
app.use(hpp());
//cors
const cors = require('cors');
app.use(cors());

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
