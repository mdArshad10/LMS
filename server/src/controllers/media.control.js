import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../utils/error.js';
import { fileUploadInCloudinary } from '../utils/cloudinary.js';
import { AsyncHandler } from '../middlewares/asyncHandler.js';

const lectureFileUpload = AsyncHandler(async (req, res, next) => {
	const file = req.files.path;
	// const
	res.status(StatusCodes.OK).json({
		success: true,
		message: 'Lecture file uploaded successfully',
	});
});

export { lectureFileUpload };
