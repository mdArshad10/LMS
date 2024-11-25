import { body } from 'express-validator';

const userValidation = {
	register: [
		body('name')
			.trim()
			.notEmpty()
			.withMessage('name is required')
			.isLength({ min: 3, max: 30 })
			.withMessage('name is must be between 3 and 30 characters')
			.escape(),
		body('email')
			.trim()
			.notEmpty()
			.withMessage('email is required')
			.isEmail()
			.withMessage('email is not valid')
			.normalizeEmail(),
		body('password')
			.trim()
			.notEmpty()
			.withMessage('password is required')
			.isLength({ min: 6, max: 50 })
			.withMessage('password is must be between 6 and 50 characters')
			.escape(),
		
	],
	login: [
		body('email')
			.trim()
			.notEmpty()
			.withMessage('email is required')
			.isEmail()
			.withMessage('email is not valid')
			.normalizeEmail(),
		body('password')
			.trim()
			.notEmpty()
			.withMessage('password is required')
			.isLength({ min: 6, max: 50 })
			.withMessage('password is must be between 6 and 50 characters')
			.escape(),
		
	],
	updateUser: [
		body('name')
			.trim()
			.notEmpty()
			.withMessage('name is required')
			.isLength({ min: 3, max: 30 })
			.withMessage('name is must be between 3 and 30 characters')
			.escape(),
	],
};

export default userValidation;
