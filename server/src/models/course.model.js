import mongoose from 'mongoose';

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

export const Courses = mongoose.model('Course', courseSchema);