import { StatusCodes } from 'http-status-codes';
import { Users } from '../models/user.model.js';
import { ErrorHandler } from '../utils/error.js';
import { AsyncHandler } from '../middlewares/asyncHandler.js';
import { fileUploadInCloudinary } from '../utils/cloudinary.js';

// cookie option
const cookieOption = {
	httpOnly: true,
	secure: true,
	maxAge: 7 * 24 * 60 * 60 * 1000,
	sameSite: 'strict',
};

// @DESC: Register the new user
// @METHOD: [POST]   /api/v1/users/signup
// @ACCESS: public
const registerUser = AsyncHandler(async (req, res, next) => {
	const { name, email, password } = req.body;

	const user = await Users.findOne({ email });
	if (user) {
		return next(
			new ErrorHandler(
				'User already exist with Email',
				StatusCodes.NOT_FOUND,
			),
		);
	}

	const newUser = await Users.create({
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

	const existUser = await Users.findOne({ email });
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
// @METHOD: [GET]   /api/v1/users/logout
// @ACCESS: private
const logoutUser = AsyncHandler(async (req, res, next) => {
	res.status(StatusCodes.OK).cookie('token', null, cookieOption).json({
		success: true,
		message: 'User logged out successfully',
	});
});

// @DESC: get the user
// @METHOD: [GET]   /api/v1/users
// @ACCESS: private
const getUser = AsyncHandler(async (req, res, next) => {
	const user = req.user;
	res.status(StatusCodes.OK).json({
		success: true,
		message: 'User logged out successfully',
		data: user,
	});
});

// @DESC: update the user detail
// @METHOD: [PUT]   /api/v1/users
// @ACCESS: private
const updateUser = AsyncHandler(async (req, res, next) => {
	const { name } = req.body;
	const profileUrl = req.file;
	// check the file

	const fileResponse = await fileUploadInCloudinary(profileUrl);
	if (!fileResponse) {
		return next(
			new ErrorHandler(
				'Failed to upload profile picture',
				StatusCodes.INTERNAL_SERVER_ERROR,
			),
		);
	}
	const user = await Users.findByIdAndUpdate(
		req.user.id,
		{
			$set: {
				name,
				profile: {
					public_id: fileResponse.public_id,
					url: fileResponse.url,
				},
			},
		},
		{ new: true },
	).select('-password');

	res.status(StatusCodes.OK).json({
		success: true,
		message: 'User detail updated successfully',
		data: user,
	});
});

export { registerUser, loginUser, logoutUser, updateUser, getUser };
