import createError from 'http-errors';
import express from 'express';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const ROOT_DIR = dirname(fileURLToPath(import.meta.url));

// load config into process.env
dotenv.config({
  path: path.normalize(path.join(ROOT_DIR, '..', 'config.env')),
});

const app = express();

// view engine setup
app.set('views', path.join(ROOT_DIR, 'views'));
app.set('view engine', 'pug');

// database (mongodb) connection
const mongoDbUri = process.env.MONGODB_URI;
mongoose.connect(mongoDbUri);
app.use((req, _, next) => {
  req.db = mongoose.connection;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(ROOT_DIR, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
