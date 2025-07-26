import { Router } from 'express';
import { signup, sendOtp } from '../controllers/user.controller'; // Import sendOtp

const router = Router();

router.post('/signup', signup);
router.post('/send-otp', sendOtp); // Add the new route

export default router;