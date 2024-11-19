import { Router } from 'express';
import { courseValidator } from '../../middlewares/validators/course.validator.js';
import { verifyInstructor, verifyUser } from '../../middlewares/verify.js';
import {
	createCourse,
	getPublishedCourse,
	editCourse,
	instructorGetAllCourses,
	getCourseById,
	createLecture,
	getCourseLecture,
	editLecture,
	getLectureById,
	togglePublishCourse,
	removeLecture,
} from '../../controllers/course.control.js';

const router = Router();

router
	.route('/')
	// create a new course
	.post(createCourse)
	// get all courses
	.get(instructorGetAllCourses);

router.route('/published').get(getPublishedCourse);

router
	.route('/:courseId')
	// get a particular course
	.get(getCourseById)
	// update or edit course
	.put(togglePublishCourse);

router.route('/:courseId/edit').put(editCourse);

router
	.route('/:courseId/lecture')
	// get a lecture
	.get(getCourseLecture)
	// add the lecture into the course
	.post(createLecture);

router.route('/:courseId/lecture/:lectureId').put(editLecture);

router.route('/lecture/:lectureId').get(getLectureById).delete(removeLecture);

export default router;
