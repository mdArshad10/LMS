import express from 'express';
import {
	createCheckoutSession,
	getAllPurchasedCourse,
	getCourseDetailWithPurchasedStatus,
	stripeWebhook,
} from '../../controllers/purchaseCourse.control.js';
import { verifyUser } from '../../middlewares/verify.js';
import { validate } from '../../middlewares/validate.js';
import {purchaseCourseValidator} from '../../middlewares/validators/purchaseCourseValidator.js'

const router = express.Router();

// create the checkout inbuild session ✅
router
	.route('/checkout/create-checkout-session')
	.post(verifyUser, createCheckoutSession);

// create a webhook ✅
router
	.route('/webhook')
	.post(express.raw({ type: 'application/json' }), stripeWebhook);

// get a course details with purchase ✅
router
	.route('/course/:courseId/detail-with-status')
	.get(verifyUser, getCourseDetailWithPurchasedStatus);
// get all purchased course ✅
router.route('/').get(verifyUser, getAllPurchasedCourse);

export default router;
