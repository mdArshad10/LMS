import { param } from 'express-validator';

export const courseProgressValidator = {
	getCourseProgress: [
		param('courseId')
			.notEmpty()
			.withMessage('course Id is required')
			.isMongoId()
			.withMessage('Invalid course Id'),
	],
	updateLectureProgress: [
		param('courseId')
			.notEmpty()
			.withMessage('course Id is required')
			.isMongoId()
			.withMessage('Invalid course Id'),
		param('lectureId')
			.notEmpty()
			.withMessage('lecture Id is required')
			.isMongoId()
			.withMessage('Invalid lecture Id'),
	],
	markAsCompleted: [
		param('courseId')
			.notEmpty()
			.withMessage('course Id is required')
			.isMongoId()
			.withMessage('Invalid course Id'),
	],
	markAsInCompleted: [
		param('courseId')
			.notEmpty()
			.withMessage('course Id is required')
			.isMongoId()
			.withMessage('Invalid course Id'),
	],
};
