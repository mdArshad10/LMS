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
	searchCourse,
} from '../../controllers/course.control.js';
import { upload } from '../../utils/multer.js';

const router = Router();

router
	.route('/')
	// create a new course ✅
	.post(verifyUser, createCourse)
	// get all courses ✅
	.get(verifyUser, instructorGetAllCourses);

	// search the course ✅
router.route('/search').get(verifyUser, searchCourse);

// get the published course ✅
router.route('/published').get(getPublishedCourse);

router
	.route('/:courseId')
	// get a particular course ✅
	.get(verifyUser, getCourseById)
	// update or edit course ✅
	.put(verifyUser, togglePublishCourse);

// edit the course ✅
router
	.route('/:courseId/edit')
	.put(verifyUser, upload.single('thumbnail'), editCourse);

router
	.route('/:courseId/lectures')
	// get a lecture  ✅
	.get(getCourseLecture)
	// add the lecture into the course ✅
	.post(createLecture);

// update the lecture ✅
router.route('/:courseId/lectures/:lectureId').put(editLecture);

router
	.route('/lectures/:lectureId')
	// get lecture by Id ✅
	.get(getLectureById)
	// delete the lecture ✅
	.delete(removeLecture);

export default router;
