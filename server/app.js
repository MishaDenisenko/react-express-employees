const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const {userRouter, employeeRouter} = require('./routes');

require('dotenv').config()

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/employee', employeeRouter);

module.exports = app;
