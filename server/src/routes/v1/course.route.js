import { Router } from 'express';
import { courseValidator } from '../../middlewares/validators/course.validator.js';
import { verifyUser } from '../../middlewares/verify.js';
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
router
	.route('/search')
	.get(verifyUser, courseValidator.searchCourse, validate, searchCourse);

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
		courseValidator.togglePublishCourse,
		validate,
		togglePublishCourse,
	)
	// delete the course
	.delete(deleteCourse);

// edit the course ✅
router
	.route('/:courseId/edit')
	.put(
		verifyUser,
		upload.single('thumbnail'),
		courseValidator.editCourse,
		validate,
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
	.post(verifyUser, courseValidator.createLecture, validate, createLecture);

// update the lecture ✅
router
	.route('/:courseId/lectures/:lectureId')
	.put(verifyUser, courseValidator.editLecture, validate, editLecture);

router
	.route('/lectures/:lectureId')
	// get lecture by Id ✅
	.get(verifyUser, courseValidator.getLectureById, validate, getLectureById)
	// delete the lecture ✅
	.delete(verifyUser, courseValidator.removeLecture, validate, removeLecture);

export default router;
