import { body, param, query } from 'express-validator';

// TODO: check the edit course' course prices section
export const courseValidator = {
	createCourse: [
		body('courseTitle')
			.trim()
			.notEmpty()
			.withMessage('Course title is required.')
			.isLength({ min: 5, max: 100 })
			.withMessage(
				'courseTitle must be at least 5 characters and at most 100 characters',
			)
			.escape(),

		body('category')
			.trim()
			.notEmpty()
			.withMessage('Category is required.')
			.escape(),
	],
	searchCourse: [
		query('query').escape(),
		query('categories').isArray().escape(),
		query('sortByPrice').escape(),
	],
	getParticularCourse: [
		param('courseId')
			.notEmpty()
			.withMessage('CourseId is required')
			.isMongoId()
			.withMessage('Invalid course ID.'),
	],
	togglePublishCourse: [
		param('courseId')
			.notEmpty()
			.withMessage('CourseId is required')
			.isMongoId()
			.withMessage('Invalid course ID'),
		query('publish')
			.trim()
			.notEmpty()
			.withMessage('publish is required')
			.isBoolean()
			.withMessage('Invalid publish value')
			.escape(),
	],
	editCourse: [
		param('courseId').isMongoId().withMessage('Invalid course ID.'),
		body('courseTitle')
			.trim()
			.notEmpty()
			.withMessage('Course title is required.')
			.isLength({ min: 5, max: 100 })
			.withMessage(
				'Course title must be at least 5 characters and at most 100 characters',
			)
			.escape(),
		body('subTitle')
			.trim()
			.notEmpty()
			.withMessage('Sub-title is required.')
			.isLength({ min: 10, max: 100 })
			.withMessage(
				'subTitle  must be at least 5 characters and at most 100 characters',
			)
			.escape(),
		body('description')
			.trim()
			.notEmpty()
			.withMessage('Sub-title is required.')
			.isLength({ min: 10 })
			.withMessage('description  must be at least 5 characters'),

		body('category')
			.trim()
			.notEmpty()
			.withMessage('Category is required.')
			.escape(),
		body('courseLevel')
			.notEmpty()
			.withMessage('course level is required')
			.custom((value) => {}),
		body('coursePrice')
			.trim()
			.toInt()
			.notEmpty()
			.withMessage('the number is must be in number')
			.notEmpty()
			.withMessage('Course Price is required')
			.escape(),
	],
	createLecture: [
		body('lectureTitle')
			.trim()
			.notEmpty()
			.withMessage('Lecture Title is required')
			.isLength({ min: 5, max: 100 })
			.withMessage(
				'Lecture Title must be at least 5 characters and at most 100 characters',
			)
			.escape(),

		param('courseId')
			.notEmpty()
			.withMessage('Course ID is required')
			.isMongoId()
			.withMessage('Invalid Course ID'),
	],
	getCourseLecture: [
		param('courseId')
			.notEmpty()
			.withMessage('Course ID is required')
			.isMongoId()
			.withMessage('Invalid Course ID'),
	],
	editLecture: [
		param('courseId')
			.notEmpty()
			.withMessage('Course ID is required')
			.isMongoId()
			.withMessage('Invalid Course ID'),
		param('lectureId')
			.notEmpty()
			.withMessage('Lecture ID is required')
			.isMongoId()
			.withMessage('Invalid Lecture ID'),

		body('lectureTitle')
			.trim()
			.notEmpty()
			.withMessage('Lecture Title is required')
			.isLength({ min: 5, max: 100 })
			.withMessage(
				'Lecture Title must be at least 5 characters and at most 100 characters',
			)
			.escape(),
		body('videoUrl')
			.trim()
			.notEmpty()
			.withMessage('Video URL is required')
			.isURL()
			.withMessage('Please enter a valid URL for the video')
			.escape(),
		body('isPreviewFree')
			.trim()
			.notEmpty()
			.withMessage('Is Preview Free is required')
			.isBoolean()
			.withMessage('Is Preview Free must be a boolean value')
			.escape(),
	],
	removeLecture: [
		param('lectureId')
			.notEmpty()
			.withMessage('Lecture ID is required')
			.isMongoId()
			.withMessage('Invalid Lecture ID'),
	],
	getLectureById: [
		param('lectureId')
			.notEmpty()
			.withMessage('Lecture ID is required')
			.isMongoId()
			.withMessage('Invalid Lecture ID'),
	],
};
