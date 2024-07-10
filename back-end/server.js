/* eslint-disable no-console */
const express = require('express');

const server = express();
const cors = require('cors');
const mongoose = require('mongoose');
const categoryRouter = require('./api/routes/category');
const businessRouter = require('./api/routes/business');
const bookingRouter = require('./api/routes/booking');
const userRouter = require('./api/routes/user');
require('dotenv').config();

server.use(express.json());
server.use(cors());

server.use(categoryRouter);
server.use(businessRouter);
server.use(bookingRouter);
server.use(userRouter);

mongoose.connect(process.env.MONGO_CONNECT)
  .then(console.log('Connected to MongoDB'))
  .catch((err) => {
    console.log('err', err);
  });

server.listen(process.env.PORT, () => {
  console.log('Server works!!!');
});
