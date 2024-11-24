import { StatusCodes } from 'http-status-codes';
import { AsyncHandler } from '../middlewares/asyncHandler.js';
import { ErrorHandler } from '../utils/error.js';
import { CourseProgress } from '../models/courseProgress.model.js';
import { Courses } from '../models/course.model.js';

// @DESC: get the course progress
// @METHOD: [GET]   /api/v1/users/signup
// @ACCESS: private
const getCourseProgress = AsyncHandler(async (req, res, next) => {
	const { courseId } = req.params;
	const userId = req.user.id;

	// Step-1 fetch the user course progress
	const courseProgress = await CourseProgress.findOne({
		courseId,
		userId,
	}).populate('courseId');

	const courseDetails = await Courses.findById(courseId);

	if (!courseDetails) {
		return next(
			new ErrorHandler('Course not found', StatusCodes.NOT_FOUND),
		);
	}

	// step 2: if no progress found, return course details with an empty progress
	if (!courseProgress) {
		res.status(StatusCodes.OK).json({
			data: {
				courseDetails,
				progress: [],
				completed: false,
			},
		});
	}

	// step 3 Return the user's course progress along with course details
	return res.status(StatusCodes.OK).json({
		data: {
			courseDetails,
			progress: courseProgress.lectureProgress,
			completed: courseProgress.completed,
		},
	});
});

// @DESC: update the lecture  of a particular course
// @METHOD: [PUT]   /course-progress/:courseId/lecture/:lectureId/view
// @ACCESS: private
const updateLectureProgress = AsyncHandler(async (req, res, next) => {
	const { courseId, lectureId } = req.params;
	const userId = req.user.id;
	let courseProgress = await CourseProgress.findOne({ userId, courseId });

	if (!courseProgress) {
		// if no progress exist, create a new one
		courseProgress = await CourseProgress.create({
			userId,
			courseId,
			completed: false,
			lectureProgress: [],
		});
	}

	console.log(courseProgress);

	// find the lecture progress in the course progress
	const lectureIndex = courseProgress.lectureProgress?.findIndex(
		(lecture) => lecture.lectureId.toString() === lectureId.toString(),
	);

	if (lectureIndex !== -1) {
		// if the lecture already exists, update it status
		courseProgress.lectureProgress[lectureIndex].viewed = true;
	} else {
		// add new lecture progress
		courseProgress.lectureProgress.push({
			lectureId,
			viewed: true,
		});
	}

	// if all lecture is completed
	const lectureProgressLength = courseProgress.lectureProgress.filter(
		(lectureProgress) => lectureProgress.viewed,
	).length;
	const course = await Courses.findById(courseId);
	if (course.lectures.length === lectureProgressLength) {
		courseProgress.completed = true;
	}

	await courseProgress.save();

	return res.status(StatusCodes.OK).json({
		message: 'lecture progress updated successfully',
	});
});

// @DESC: mark the all lectures as completed
// @METHOD: [PUT]   /api/v1/users/signup
// @ACCESS: private
const markAsCompleted = AsyncHandler(async (req, res, next) => {
	const { courseId } = req.params;
	const userId = req.user.id;
	let courseProgress = await CourseProgress.findOne({ userId, courseId });
	if (!courseProgress) {
		return next(
			new ErrorHandler(
				'Course Progress not found',
				StatusCodes.NOT_FOUND,
			),
		);
	}

	courseProgress.lectureProgress.map(
		(lectureProgress) => (lectureProgress.viewed = true),
	);

	courseProgress.completed = true;

	await courseProgress.save();
	return res.status(StatusCodes.OK).json({
		message: 'All Lectures marked as completed ',
	});
});

// @DESC: mark the all lectures as InCompleted
// @METHOD: [PUT]   /api/v1/users/signup
// @ACCESS: private
const markAsInCompleted = AsyncHandler(async (req, res, next) => {
	const { courseId } = req.params;
	const userId = req.user.id;
	let courseProgress = await CourseProgress.findOne({ userId, courseId });
	if (!courseProgress) {
		return next(
			new ErrorHandler(
				'Course Progress not found',
				StatusCodes.NOT_FOUND,
			),
		);
	}

	courseProgress.lectureProgress.map(
		(lectureProgress) => (lectureProgress.viewed = false),
	);

	courseProgress.completed = false;
	await courseProgress.save();
	return res.status(StatusCodes.OK).json({
		message: 'All Lectures marked as incompleted',
	});
});

export {
	getCourseProgress,
	updateLectureProgress,
	markAsCompleted,
	markAsInCompleted,
};
