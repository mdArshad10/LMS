import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { ORIGIN_URL } from './constants.js';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { StatusCodes } from 'http-status-codes';
import mongoSanitize from 'express-mongo-sanitize';
import { rateLimit } from 'express-rate-limit';
import { POSTMAN_URL } from './constants.js';

const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
});

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
app.use(mongoSanitize());
// app.use(limiter);

// middlewares
app.get('/', (req, res, next) => {
	if (POSTMAN_URL) {
		return res.redirect(`${POSTMAN_URL}`);
	}
	return res.status(StatusCodes.OK).json({
		success: true,
		message: 'Welcome to the Learning Management System API',
	});
});

app.use('/api', routes);
app.use(errorHandler);
app.use('*', (req, res, next) => {
	res.status(StatusCodes.NOT_FOUND).json({
		success: false,
		message: 'Page not found',
	});
});

export default app;
