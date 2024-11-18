import { Router } from 'express';

const router = Router();

// register the user
router.route('/signup').post();

// login the user
router.route('/login').post();

export default router;
