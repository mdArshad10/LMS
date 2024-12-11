import {ErrorHandler} from '../utils/error.js'
export const errorHandler = async (err, req, res, next) => {
	  // Check if headers have already been sent
  if (res.headersSent) {
    return next(err);
  }
	const message = err?.message || 'Something went wrong';
	const statusCode = err?.statusCode || 500;

	res.status(statusCode).json({
		success: false,
		message,
		stack: err.stack,
	});
};
