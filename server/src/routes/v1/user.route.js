import { Router } from 'express';
import { userValidation } from '../../middlewares/validators/user.validator.js';
import {
	loginUser,
	logoutUser,
	registerUser,
	updateUser,
	getUser,
} from '../../controllers/user.control.js';
import { verifyUser } from '../../middlewares/verify.js';
import { upload } from '../../utils/multer.js';

const router = Router();

// register the user ✅
router.route('/signup').post(registerUser);

// login the user ✅
router.route('/login').post(loginUser);

// logout the user ✅
router.route('/logout').post(verifyUser, logoutUser);

// update the user
router
	.route('/')
	// get a particular user✅
	.get(verifyUser, getUser)
	// update the user ✅
	.put(verifyUser, upload.single('avatar'), updateUser);

export default router;
