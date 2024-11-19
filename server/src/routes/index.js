import { Router } from 'express';
import v1UserRoutes from './v1/user.route.js';
import v1CourseRoutes from './v1/course.route.js';
import mediaUploadRoute from './v1/media.route.js';

const router = Router();

router.use('/v1/users', v1UserRoutes);
router.use('/v1/courses', v1CourseRoutes);
router.use("/v1/media", mediaUploadRoute)

export default router;
