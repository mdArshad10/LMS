import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../utils/error.js';
import { ACCESS_TOKEN_SECRET } from '../constants.js';
import { Users } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const verifyUser = async (req, res, next) => {
	try {
		const token =
			req.cookies?.token || req.headers['authorization']?.split(' ')[1];
		console.log(token);

		if (!token) {
			return next(
				new ErrorHandler('Token is not found', StatusCodes.NOT_FOUND),
			);
		}

		const decode = jwt.verify(token, ACCESS_TOKEN_SECRET);
		if (!decode) {
			return next(
				new ErrorHandler('Invalid token', StatusCodes.UNAUTHORIZED),
			);
		}
		const user = await Users.findById(decode.id).select('-password');
		if (!user) {
			return next(
				new ErrorHandler('user not found', StatusCodes.NOT_FOUND),
			);
		}

		req.user = user;
		next();
	} catch (error) {
		return next(
			new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR),
		);
	}
};

export const verifyInstructor = (req, res, next) => {
	const user = req.user;
	if (user.role !== 'instructor') {
		return next(
			new ErrorHandler('Unauthorized access', StatusCodes.UNAUTHORIZED),
		);
	}
	next();
};
