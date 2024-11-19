import { StatusCodes } from 'http-status-codes';
import { CoursePurchases } from '../models/purchaseCourse.model.js';
import { Courses } from '../models/course.model.js';
import { ErrorHandler } from '../utils/error.js';
import { AsyncHandler } from '../middlewares/asyncHandler.js';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '../constants.js';
import { ORIGIN_URL, WEBHOOK_ENDPOINT_SECRET } from '../constants.js';

const stripe = new Stripe(STRIPE_SECRET_KEY);

// @DESC: create a stripe checkout session
// @METHOD: [POST]   /api/v1/
// @ACCESS: private
const createCheckoutSession = AsyncHandler(async (req, res, next) => {
	const userId = req.user.id;
	const { courseId } = req.body;
	const course = await Courses.findById(courseId);
	if (!course) {
		return next(
			new ErrorHandler('Course not found', StatusCodes.NOT_FOUND),
		);
	}
	// create a new purchase recode
	const newPurchase = await CoursePurchases.create({
		userId,
		courseId,
		amount: course.coursePrice,
		status: 'pending',
	});
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [
			{
				price_data: {
					currency: 'inr',
					product: course.id,
					product_data: {
						name: course.courseTitle,
						images: [course.courseThumbnail],
					},
					unit_amount: course.coursePrice * 100,
				},
				quantity: 1,
			},
		],
		mode: 'payment',

		success_url: `${ORIGIN_URL}/course-progress/${courseId}`,
		cancel_url: `${ORIGIN_URL}/course-details/${courseId}`,
		metadata: {
			courseId: courseId,
			userId: userId,
		},
		shipping_address_collection: {
			allowed_countries: ['IN'],
		},
	});
	newPurchase.paymentId = session.id;
	await newPurchase.save();
	return res.status(StatusCodes.OK).json({
		success: true,
		url: session.url,
	});
});

const stripeWebhook = AsyncHandler(async (req, res, next) => {
	let event;

	try {
		const payloadString = JSON.stringify(req.body, null, 2);
		const secret = WEBHOOK_ENDPOINT_SECRET;

		const header = stripe.webhooks.generateTestHeaderString({
			payload: payloadString,
			secret,
		});

		event = stripe.webhooks.constructEvent(payloadString, header, secret);
	} catch (error) {
		console.error('Webhook error:', error.message);
		return res.status(400).send(`Webhook error: ${error.message}`);
	}

	// Handle the checkout session completed event
	if (event.type === 'checkout.session.completed') {
		console.log('check session complete is called');

		try {
			const session = event.data.object;

			const purchase = await CoursePurchase.findOne({
				paymentId: session.id,
			}).populate({ path: 'courseId' });

			if (!purchase) {
				return res.status(404).json({ message: 'Purchase not found' });
			}

			if (session.amount_total) {
				purchase.amount = session.amount_total / 100;
			}
			purchase.status = 'completed';

			// Make all lectures visible by setting `isPreviewFree` to true
			if (purchase.courseId && purchase.courseId.lectures.length > 0) {
				await Lecture.updateMany(
					{ _id: { $in: purchase.courseId.lectures } },
					{ $set: { isPreviewFree: true } },
				);
			}

			await purchase.save();

			// Update user's enrolledCourses
			await User.findByIdAndUpdate(
				purchase.userId,
				{ $addToSet: { enrolledCourses: purchase.courseId._id } }, // Add course ID to enrolledCourses
				{ new: true },
			);

			// Update course to add user ID to enrolledStudents
			await Course.findByIdAndUpdate(
				purchase.courseId._id,
				{ $addToSet: { enrolledStudents: purchase.userId } }, // Add user ID to enrolledStudents
				{ new: true },
			);
		} catch (error) {
			console.error('Error handling event:', error);
			return res.status(500).json({ message: 'Internal Server Error' });
		}
	}
	res.status(200).send();
});

const getCourseDetailWithPurchasedStatus = AsyncHandler(
	async (req, res, next) => {
		const { courseId } = req.params;
		const userId = req.user.id;
		const course = await Courses.findById(courseId)
			.populate({ path: 'creator' })
			.populate({ path: 'lectures' });

		if (!course) {
			return next(
				new ErrorHandler('Course not found', StatusCodes.NOT_FOUND),
			);
		}

		const purchased = await CoursePurchases.findOne({ userId, courseId });

		return res.status(StatusCodes.OK).json({
			course,
			purchased: !!purchased,
		});
	},
);

const getAllPurchasedCourse = AsyncHandler(async (req, res, next) => {
	const purchasedCourse = await Courses.find({
		status: 'completed',
	}).populate('courseId');
	if (!purchasedCourse) {
		return res.status(StatusCodes.NOT_FOUND).json({
			purchasedCourse: [],
		});
	}

	return res.status(StatusCodes.OK).json({
		purchasedCourse,
	});
});

export {
	createCheckoutSession,
	stripeWebhook,
	getCourseDetailWithPurchasedStatus,
	getAllPurchasedCourse,
};
