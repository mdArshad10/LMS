import { StatusCodes } from 'http-status-codes';
import { ExpressValidator } from 'express-validator';

export const validate = async (req, res, next) => {
	const { errors } = ExpressValidator(req);
	if (errors.length == 0) {
		return next();
	}

	const extractedErrors = [];
	errors.map((err) => extractedErrors.push(err.msg));

	res.status(StatusCodes.BAD_REQUEST).json({
		success: false,
		message: 'invalid data is incoming',
		err: extractedErrors,
	});
};
