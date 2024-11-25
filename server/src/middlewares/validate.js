import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}

	const extractedErrors = [];
	errors.array().map((err) => extractedErrors.push(err.msg));

	res.status(StatusCodes.BAD_REQUEST).json({
		success: false,
		message: 'invalid data is incoming',
		err: extractedErrors,
	});
};

export default validate;
