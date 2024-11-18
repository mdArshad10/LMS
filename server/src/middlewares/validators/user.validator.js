import { body } from 'express-validator';

const userValidation = {
	register: [
		body('name').isString().escape(),
		body('email').isString().isEmail().escape(),
	],
};

export { userValidation };
