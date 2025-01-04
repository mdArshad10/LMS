import { Router } from 'express';
import {
	getCourseProgress,
	markAsCompleted,
	markAsInCompleted,
	updateLectureProgress,
} from '../../controllers/courseProgress.control.js';
import { verifyUser } from '../../middlewares/verify.js';
import validate  from '../../middlewares/validate.js';
import { courseProgressValidator } from '../../middlewares/validators/courseProgress.validator.js';

const router = Router();

router
	.route('/:courseId')
	.get(
		verifyUser,
		courseProgressValidator.getCourseProgress,
		validate,
		getCourseProgress,
	);
router
	.route('/:courseId/lectures/:lectureId/view')
	.post(
		verifyUser,
		courseProgressValidator.updateLectureProgress,
		validate,
		updateLectureProgress,
	);
router
	.route('/:courseId/complete')
	.post(
		verifyUser,
		courseProgressValidator.markAsCompleted,
		validate,
		markAsCompleted,
	);
router
	.route('/:courseId/incomplete')
	.post(
		verifyUser,
		courseProgressValidator.markAsInCompleted,
		validate,
		markAsInCompleted,
	);

export default router;
