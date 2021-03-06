import createError from 'http-errors';
import express from 'express';
import fileUpload from 'express-fileupload';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import parseAuthTokenFromHeader from './middleware/parseAuthTokenFromHeader.js';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

//
// Route Imports
//
import authRouter from './routes/auth.js';
import indexRouter from './routes/index.js';
import memeRouter from './routes/memes.js';
import templateRouter from './routes/template.js';
import userRouter from './routes/user.js';

export const ROOT_DIR = dirname(fileURLToPath(import.meta.url));

// load config into process.env
dotenv.config({
  path: path.normalize(path.join(ROOT_DIR, '..', '.env')),
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

app.use(parseAuthTokenFromHeader);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
// enable file uploads
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(ROOT_DIR, 'public')));

//
// Routes
//
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/memes', memeRouter);
app.use('/templates', templateRouter);
app.use('/user', userRouter);

// API Docuemntation (Swagger / OpenAPI)
const swaggerDocument = yaml.load(path.join(ROOT_DIR, '..', 'openapi.yml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
