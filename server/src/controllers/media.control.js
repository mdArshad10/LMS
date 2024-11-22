import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../utils/error.js';
import { fileUploadInCloudinary } from '../utils/cloudinary.js';
import { AsyncHandler } from '../middlewares/asyncHandler.js';

const lectureFileUpload = AsyncHandler(async (req, res, next) => {
	const file = req.file.path;
	if (!file) {
		return next(new ErrorHandler('File not found', StatusCodes.NOT_FOUND));
	}
	const response = await fileUploadInCloudinary(file, 'video');
	if (!response) {
		return next(
			new ErrorHandler(
				'Failed to upload file to Cloudinary',
				StatusCodes.INTERNAL_SERVER_ERROR,
			),
		);
	}
	res.status(StatusCodes.OK).json({
		success: true,
		message: 'Lecture file uploaded successfully',
		data: response,
	});
});

export { lectureFileUpload };
