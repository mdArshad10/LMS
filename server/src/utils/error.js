import { StatusCodes } from 'http-status-codes';

class ErrorHandler extends Error {
	constructor(
		message = 'something wrong wrong',
		statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
	) {
		super(message);
		this.statusCode = statusCode;

		Error.captureStackTrace(this, this.constructor);
	}
}

export { ErrorHandler };
