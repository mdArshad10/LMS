import { body, param } from 'express-validator';

export const purchaseCourseValidator = {
	checkoutSession: [
		body('courseId')
			.notEmpty()
			.withMessage('CourseID is required')
			.isMongoId()
			.withMessage('courserId is invalid'),
	],
	getPurchasedCourseDetail: [
		param('courseId')
			.notEmpty()
			.withMessage('Course ID is required')
			.isMongoId()
			.withMessage('courserId is invalid'),
	],
};
