import mongoose from 'mongoose';
import { ErrorHandler } from '../utils/error.js';
import { Lectures } from '../models/lecture.model.js';

const courseSchema = new mongoose.Schema(
	{
		courseTitle: {
			type: String,
			required: true,
		},
		subTitle: {
			type: String,
		},
		description: {
			type: String,
		},
		category: {
			type: String,
			required: true,
		},
		courseLevel: {
			type: String,
			enum: ['Beginner', 'Medium', 'Advance'],
		},
		coursePrice: {
			type: Number,
		},
		courseThumbnail: {
			public_id: String,
			url: String,
		},
		enrolledStudent: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		lectures: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Lecture',
			},
		],
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

courseSchema.pre('deleteOne', { document: true }, async function (next) {
	try {
		if (this.$isEmpty('lectures')) next();
		await Lectures.deleteMany({ _id: { $in: this.lectures } });
		next();
	} catch (error) {
		next(new ErrorHandler(error.message, 404));
	}
});

export const Courses = mongoose.model('Course', courseSchema);
