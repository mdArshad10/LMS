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
import { POSTMAN_URL, NODE_ENV } from './constants.js';
import path from 'node:path';

const app = express();

const __dirname = path.resolve();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
});

app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(morgan('dev'));
app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				mediaSrc: [
					"'self'",
					'http://res.cloudinary.com',
					'https://res.cloudinary.com',
					'https://*.cloudinary.com',
				],
				imgSrc: [
					"'self'",
					'data:',
					'https://res.cloudinary.com',
					'https://*.cloudinary.com',
				],
				scriptSrc: ["'self'", "'unsafe-inline'"],
				styleSrc: ["'self'", "'unsafe-inline'"],
				connectSrc: ["'self'"],
			},
		},
		csrf: true,
	}),
);
app.use(cookieParser());
app.use(
	cors({
		origin: ORIGIN_URL,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: [
			'Content-Type',
			'Authorization',
			'Access-Control-Allow-Credentials',
		],
		credentials: true,
	}),
);
app.use(mongoSanitize());
app.use(limiter);

// middlewares
app.get('/api/v1', (req, res, next) => {
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
app.use('/api/*', (req, res, next) => {
	res.status(StatusCodes.NOT_FOUND).json({
		success: false,
		message: 'Page not found',
	});
});

if (NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/dist')));

	app.get('*', (req, res, next) => {
		res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
	});
}

export default app;
