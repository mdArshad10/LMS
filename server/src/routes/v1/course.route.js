import { Router } from 'express';
import { courseValidator } from '../../middlewares/validators/course.validator.js';
import { verifyUser, verifyInstructor } from '../../middlewares/verify.js';
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
	searchCourse,
	deleteCourse,
} from '../../controllers/course.control.js';
import { upload } from '../../utils/multer.js';
import validate from '../../middlewares/validate.js';

const router = Router();

router
	.route('/')
	// create a new course ✅
	.post(verifyUser, courseValidator.createCourse, validate, createCourse)
	// get all courses ✅
	.get(verifyUser, instructorGetAllCourses);

// search the course ✅
router.route('/search').get(verifyUser, searchCourse);

// get the published course ✅
router.route('/published').get(getPublishedCourse);

router
	.route('/:courseId')
	// get a particular course ✅
	.get(
		verifyUser,
		courseValidator.getParticularCourse,
		validate,
		getCourseById,
	)
	// update or edit course ✅
	.put(
		verifyUser,
		verifyInstructor,
		courseValidator.togglePublishCourse,
		validate,
		togglePublishCourse,
	)
	// delete the course
	.delete(verifyUser, verifyInstructor, deleteCourse);

// edit the course ✅
router
	.route('/:courseId/edit')
	.put(
		verifyUser,
		verifyInstructor,
		courseValidator.editCourse,
		validate,
		upload.single('thumbnail'),
		editCourse,
	);

router
	.route('/:courseId/lectures')
	// get a lecture  ✅
	.get(
		verifyUser,
		courseValidator.getCourseLecture,
		validate,
		getCourseLecture,
	)
	// add the lecture into the course ✅
	.post(
		verifyUser,
		verifyInstructor,
		courseValidator.createLecture,
		validate,
		createLecture,
	);

// update the lecture ✅
router
	.route('/:courseId/lectures/:lectureId')
	.put(
		verifyUser,
		verifyInstructor,
		courseValidator.editLecture,
		validate,
		editLecture,
	);

router
	.route('/lectures/:lectureId')
	// get lecture by Id ✅
	.get(verifyUser, courseValidator.getLectureById, validate, getLectureById)
	// delete the lecture ✅
	.delete(
		verifyUser,
		verifyInstructor,
		courseValidator.removeLecture,
		validate,
		removeLecture,
	);

export default router;
