const express = require('express');
const dotenv = require('dotenv');

const bootcamps = require('./routes/bootcamps');

//Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();
//Mount Routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  `SERVER IS RUNNING ON PORT ${PORT}`;
});
