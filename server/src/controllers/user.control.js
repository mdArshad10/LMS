import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.model.js';
import { ErrorHandler } from '../utils/error.js';
import { AsyncHandler } from '../middlewares/asyncHandler.js';

// cookie option
const cookieOption = {
	httpOnly: true,
	secure: true,
	maxAge: 7 * 24 * 60 * 60 * 1000,
};

// @DESC: Register the new user
// @METHOD: [POST]   /api/v1/users/signup
// @ACCESS: public
const registerUser = AsyncHandler(async (req, res, next) => {
	const { name, email, password } = req.body;

	const user = await user.findOne({ email });
	if (user) {
		return next(
			new ErrorHandler(
				'User already exist with Email',
				StatusCodes.NOT_FOUND,
			),
		);
	}

	const newUser = await User.create({
		name,
		email,
		password,
	});
	const token = await newUser.generateToken();

	const { password: hashedPassword, ...userDate } = newUser._doc();
	res.status(StatusCodes.CREATED).cookie('token', token, cookieOption).json({
		success: true,
		message: 'User created successfully',
		data: userDate,
	});
});

// @DESC: login the user
// @METHOD: [POST]   /api/v1/users/login
// @ACCESS: public
const loginUser = AsyncHandler(async (req, res, next) => {
	// password must be not longer then 72 characters
	const { email, password } = req.body;

	const existUser = await User.findOne({ email });
	if (!existUser) {
		return next(
			new ErrorHandler(
				'Incorrect User or Password',
				StatusCodes.NOT_FOUND,
			),
		);
	}

	const matchPassword = await existUser.isMatchPassword(password);
	if (matchPassword) {
		return next(
			new ErrorHandler(
				'Incorrect User or Password',
				StatusCodes.NOT_FOUND,
			),
		);
	}

	const token = await existUser.generateToken();
	const { password: hashedPassword, ...userDate } = existUser._doc();
	res.status(StatusCodes.OK).cookie('token', token, cookieOption).json({
		success: true,
		message: 'User logged in successfully',
		data: userDate,
	});
});

// @DESC: logout the user
// @METHOD: [POST]   /api/v1/users/logout
// @ACCESS: private
const logoutUser = AsyncHandler(async (req, res, next) => {
	res.status(StatusCodes.OK).cookie('token', null, cookieOption).json({
		success: true,
		message: 'User logged out successfully',
	});
});

export { registerUser, loginUser, logoutUser };
