import { StatusCodes } from 'http-status-codes';
import { ExpressValidator } from 'express-validator';

export const validate = async (req, res, next) => {
	const error = ExpressValidator(req);
	if (error.isEmpty()) {
		return next();
	}

	const extractedErrors = [];
	error.array().map((err) => extractedErrors.push(err.msg));

	res.status(StatusCodes.BAD_REQUEST).json({
		success: false,
		message: 'invalid data is incoming',
		err: extractedErrors,
	});
};
