import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema(
	{
		lectureTitle: {
			type: String,
			required: true,
		},
		videoUrl: {
			public_id: String,
			url: String,
		},
		isPreviewFree: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

export const Lectures = mongoose.model('Lecture', lectureSchema);
