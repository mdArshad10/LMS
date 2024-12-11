import { Router } from 'express';
import userValidation from '../../middlewares/validators/user.validator.js';
import {
	loginUser,
	logoutUser,
	registerUser,
	updateUser,
	getUser,
} from '../../controllers/user.control.js';
import { verifyUser } from '../../middlewares/verify.js';
import { upload } from '../../utils/multer.js';
import validate from '../../middlewares/validate.js';

const router = Router();

// register the user ✅

// router.post('/signup', userValidation.register, validate, registerUser);
router.route('/signup').post(userValidation.register, validate, registerUser);

// // login the user ✅
router.route('/login').post(userValidation.login, validate, loginUser);

// // logout the user ✅
router.route('/logout').post(verifyUser, logoutUser);

// // update the user
router
	.route('/')
	// get a particular user✅
	.get(verifyUser, getUser)
	// update the user ✅
	.put(
		verifyUser,
		upload.single('avatar'),
		userValidation.updateUser,
		validate,
		updateUser,
	);

export default router;
