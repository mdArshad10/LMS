import express from 'express';
import {
	createCheckoutSession,
	getAllPurchasedCourse,
	getCourseDetailWithPurchasedStatus,
	stripeWebhook,
} from '../../controllers/purchaseCourse.control.js';
import { verifyUser } from '../../middlewares/verify.js';

const router = express.Router();

router
	.route('/checkout/create-checkout-session')
	.post(verifyUser, createCheckoutSession);
router
	.route('/webhook')
	.post(express.raw({ type: 'application/json' }), stripeWebhook);
router
	.route('/course/:courseId/detail-with-status')
	.get(verifyUser, getCourseDetailWithPurchasedStatus);

router.route('/').get(verifyUser, getAllPurchasedCourse);

export default router;
