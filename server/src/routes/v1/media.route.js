import { Router } from 'express';
import { verifyUser } from '../../middlewares/verify.js';
import { lectureFileUpload } from '../../controllers/media.control.js';
import { upload } from '../../utils/multer.js';

const router = Router();

// file upload successfully ✅
router.route('/upload-video').post(upload.single('file'), lectureFileUpload);

export default router;
