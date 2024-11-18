import { Router } from 'express';
import v1UserRoutes from './v1/user.route.js';

const router = Router();

router.use('/v1/users', v1UserRoutes);


export default router;
