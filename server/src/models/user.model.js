import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../constants.js';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ['instructor', 'student', 'admin'],
			default: 'student',
		},
		enrolledCourses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Course',
			},
		],
		photoUrl: {
			public_id: {
				type: String,
			},
			url: {
				type: String,
			},
		},
	},
	{ timestamps: true },
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.isMatchPassword = async function (enteredPassword) {
	return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = async function () {
	return jwt.sign({ id: this._id }, ACCESS_TOKEN_SECRET, {
		expiresIn: '15d',
	});
};

export const Users = mongoose.model('User', userSchema);
