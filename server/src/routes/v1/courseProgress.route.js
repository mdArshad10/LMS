import { Router } from 'express';
import {
	getCourseProgress,
	markAsCompleted,
	markAsInCompleted,
	updateLectureProgress,
} from '../../controllers/courseProcess.control.js';
import { verifyUser } from '../../middlewares/verify.js';
import { validate } from '../../middlewares/validate.js';
import { courseProcessValidator } from '../../middlewares/validators/courseProgress.validator.js';

const router = Router();

router.route('/:courseId').get(verifyUser, getCourseProgress);
router
	.route('/:courseId/lecture/:lectureId/view')
	.post(verifyUser, updateLectureProgress);
router.route('/:courseId/complete').post(verifyUser, markAsCompleted);
router.route('/:courseId/incomplete').post(verifyUser, markAsInCompleted);

export default router;
