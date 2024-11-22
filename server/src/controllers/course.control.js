import { StatusCodes } from 'http-status-codes';
import { Courses } from '../models/course.model.js';
import { ErrorHandler } from '../utils/error.js';
import { AsyncHandler } from '../middlewares/asyncHandler.js';
import {
	fileUploadInCloudinary,
	deleteMediaFromCloudinary,
} from '../utils/cloudinary.js';
import { Lectures } from '../models/lecture.model.js';

// @DESC: instructor create a new course ✅
// @METHOD: [POST]   /api/v1/courses/
// @ACCESS: private
const createCourse = AsyncHandler(async (req, res, next) => {
	const { courseTitle, category } = req.body;

	// TODO: same user not created same course
	const newCourse = await Courses.create({
		courseTitle,
		category,
		creator: req.user.id,
	});

	res.status(StatusCodes.CREATED).json({
		success: true,
		message: 'Course created successfully',
		course: newCourse,
	});
});

// @DESC: get all publish courses ✅
// @METHOD: [GET]   /api/v1/courses/published
// @ACCESS: private
const getPublishedCourse = AsyncHandler(async (req, res, next) => {
	const courses = await Courses.find({ isPublished: true }).populate({
		path: 'creator',
		select: 'name photoUrl',
	});
	if (courses.length == 0) {
		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'No published courses found',
			courses: [],
		});
	}
	return res.status(StatusCodes.OK).json({
		success: true,
		message: 'Published courses fetched successfully',
		course: courses,
	});
});

// @DESC: search the  courses ✅
// @METHOD: [GET]   /api/v1/courses/published
// @ACCESS: private
const searchCourse = AsyncHandler(async (req, res, next) => {
	const { query = '', categories = [], sortByPrice = '' } = req.query;

	// create search query
	const searchCriteria = {
		isPublished: true,
		$or: [
			{
				courseTitle: { $regex: query, $options: 'i' },
			},
			{
				subTitle: { $regex: query, $options: 'i' },
			},
			{
				category: { $regex: query, $options: 'i' },
			},
		],
	};

	// if categories are selected
	if (categories.length > 0) {
		searchCriteria.category = { $in: categories };
	}
	// define sorting order
	const sortOptions = {};
	if (sortByPrice === 'low') {
		sortOptions.coursePrice = 1;
	} else if (sortByPrice === 'high') {
		sortOptions.coursePrice = -1;
	}

	let courses = await Courses.find(searchCriteria)
		.populate({ path: 'creator', select: 'name photoUrl' })
		.sort(sortOptions);

	return res.status(StatusCodes.OK).json({
		success: true,
		message: 'Courses fetched successfully',
		courses: courses || [],
	});
});

// @DESC: get all courses of creator ✅
// @METHOD: [GET]   /api/v1/courses/
// @ACCESS: private/instructor
// TODO: adding the pagination and search parameters
const instructorGetAllCourses = AsyncHandler(async (req, res, next) => {
	const courses = await Courses.find({ creator: req.user.id }).sort({
		createdAt: -1,
	});
	if (courses.length === 0) {
		return res.status(StatusCodes.NOT_FOUND).json({
			success: true,
			message: 'No courses found',
			courses: [],
		});
	}
	return res.status(StatusCodes.OK).json({
		success: true,
		message: 'All courses fetched successfully',
		courses,
	});
});

// @DESC: creator edit the course ✅
// @METHOD: [PUT]   /api/v1/courses/:courseId/edit
// @ACCESS: private/instructor
const editCourse = AsyncHandler(async (req, res, next) => {
	const { courseId } = req.params;
	const {
		courseTitle,
		subTitle,
		description,
		category,
		courseLevel,
		coursePrice,
	} = req.body;
	const thumbnail = req.file;
	const existCourse = await Courses.findById(courseId);
	if (!existCourse) {
		return next(
			new ErrorHandler('Course is not found', StatusCodes.NOT_FOUND),
		);
	}
	let courseNewThumbnail;
	if (thumbnail) {
		if (existCourse.courseThumbnail?.public_id) {
			await deleteMediaFromCloudinary(
				existCourse.courseThumbnail?.public_id,
			);
		}
		courseNewThumbnail = await fileUploadInCloudinary(thumbnail.path);
	}
	const courseUpdatedData = {
		courseTitle,
		subTitle,
		description,
		category,
		courseLevel,
		coursePrice,
		courseThumbnail: {
			public_id: courseNewThumbnail?.public_id,
			url: courseNewThumbnail?.url,
		},
	};

	const updatedCourse = await Courses.findByIdAndUpdate(
		courseId,
		courseUpdatedData,
		{ new: true },
	);

	return res.status(StatusCodes.OK).json({
		success: true,
		message: 'Course updated successfully',
		course: updatedCourse,
	});
});

// @DESC: creator edit the course ✅
// @METHOD: [GET]   /api/v1/courses/:courseId
// @ACCESS: private/instructor
const getCourseById = AsyncHandler(async (req, res, next) => {
	const { courseId } = req.params;
	const course = await Courses.findById(courseId);

	if (!course) {
		return next(
			new ErrorHandler('Course is not found', StatusCodes.NOT_FOUND),
		);
	}

	return res.status(StatusCodes.OK).json({
		success: true,
		message: 'Course fetched successfully',
		course,
	});
});

// @DESC: creator create a lecture ✅
// @METHOD: [POST]   /api/v1/courses/:courseId/lecture
// @ACCESS: private/instructor
const createLecture = AsyncHandler(async (req, res, next) => {
	const { lectureTitle } = req.body;
	const { courseId } = req.params;

	const newLecture = await Lectures.create({ lectureTitle });

	const course = await Courses.findByIdAndUpdate(
		courseId,
		{
			$push: {
				lectures: newLecture._id,
			},
		},
		{ new: true },
	);

	res.status(StatusCodes.CREATED).json({
		success: true,
		message: 'Lecture added successfully',
	});
});

// @DESC: get a lecture of course ✅
// @METHOD: [GET]   /api/v1/courses/:courseId/lecture
// @ACCESS: private/instructor
const getCourseLecture = AsyncHandler(async (req, res, next) => {
	const { courseId } = req.params;
	const course = await Courses.findById(courseId).populate('lectures');

	if (!course) {
		return next(
			new ErrorHandler('Course Not found', StatusCodes.NOT_FOUND),
		);
	}

	return res.status(StatusCodes.OK).json({
		success: true,
		message: 'Lectures fetched successfully',
		lectures: course.lectures,
	});
});

// @DESC: update a lecture of course ✅
// @METHOD: [PUT]   /api/v1/courses/:courseId/lecture/:lectureId
// @ACCESS: private/instructor
const editLecture = AsyncHandler(async (req, res, next) => {
	const { lectureTitle, videoUrl, isPreviewFree } = req.body;
	const { courseId, lectureId } = req.params;
	const existLecture = await Lectures.findById(lectureId);
	if (!existLecture) {
		return next(
			new ErrorHandler('Lecture Not found', StatusCodes.NOT_FOUND),
		);
	}
	// update teh lectures
	if (lectureTitle) existLecture.lectureTitle = lectureTitle;
	if (videoUrl) existLecture.videoUrl = videoUrl;
	if (isPreviewFree) existLecture.isPreviewFree = isPreviewFree;

	await existLecture.save();
	const course = await Courses.findById(courseId);
	if (course && !course.lectures.includes(existLecture._id)) {
		course.lectures.push(existLecture._id);
		await course.save();
	}
	return res.status(StatusCodes.OK).json({
		lecture: existLecture,
		message: 'Lecture updated successfully',
	});
});

// @DESC: remove the lecture ✅
// @METHOD: [DELETE]   /api/v1/courses/lecture/:lectureId
// @ACCESS: private/instructor
const removeLecture = AsyncHandler(async (req, res, next) => {
	const { lectureId } = req.params;

	const lecture = await Lectures.findById(lectureId);
	if (!lecture) {
		return next(
			new ErrorHandler('Lecture not found', StatusCodes.NOT_FOUND),
		);
	}

	if (lecture.videoUrl?.public_id) {
		// remove the file from cloudinary
		const response = await deleteMediaFromCloudinary(
			lecture.videoUrl.public_id,
			'video',
		);
		if (!response) {
			return next(
				new ErrorHandler(
					'Failed to delete the video from cloudinary',
					StatusCodes.INTERNAL_SERVER_ERROR,
				),
			);
		}
	}

	// remove the lecture from course
	await Courses.updateOne(
		{ lectures: lectureId },
		{
			$pull: { lectures: lectureId },
		},
	);

	await lecture.deleteOne();
	return res.status(StatusCodes.OK).json({
		success: true,
		message: 'Lecture removed successfully',
	});
});

// @DESC: Get lecture by lectureId ✅
// @METHOD: [GET]   /api/v1/courses/lecture/:lectureId
// @ACCESS: private/instructor
const getLectureById = AsyncHandler(async (req, res, next) => {
	const { lectureId } = req.params;
	const lecture = await Lectures.findById(lectureId);
	if (!lecture) {
		return next(
			new ErrorHandler('Lecture not found', StatusCodes.NOT_FOUND),
		);
	}
	return res.status(StatusCodes.OK).json({
		success: true,
		message: 'Lecture fetched successfully',
		lecture,
	});
});

// @DESC: publish the unpublished lecture ✅
// @METHOD: [PUT]   /api/v1/courses/:courseId?publish=true
// @ACCESS: private/instructor
const togglePublishCourse = AsyncHandler(async (req, res, next) => {
	const { courseId } = req.params;
	const { publish } = req.query;
	const course = await Courses.findById(courseId);
	if (!course) {
		return next(
			new ErrorHandler('Course not found', StatusCodes.NOT_FOUND),
		);
	}
	course.isPublished = publish === 'true';
	await course.save();

	const statusMessage = course.isPublished ? 'published' : 'Unpublished';
	return res.status(StatusCodes.OK).json({
		success: true,
		message: `Course ${statusMessage} successfully`,
	});
});

export {
	createCourse,
	searchCourse,
	instructorGetAllCourses,
	editCourse,
	getCourseById,
	createLecture,
	getCourseLecture,
	editLecture,
	getLectureById,
	removeLecture,
	togglePublishCourse,
	getPublishedCourse,
};
