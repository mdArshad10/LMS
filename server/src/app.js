import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { ORIGIN_URL } from './constants.js';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { StatusCodes } from 'http-status-codes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());
app.use(
	cors({
		origin: ORIGIN_URL,
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization'],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	}),
);

// middlewares
app.use('/api', routes);
app.use(errorHandler);
app.use('*', (req, res, next) => {
	res.status(StatusCodes.NOT_FOUND).json({
		success: false,
		message: 'Page not found',
	});
});

export default app;
