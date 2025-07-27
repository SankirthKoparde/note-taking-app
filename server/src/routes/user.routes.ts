import { Router } from 'express';
import { signup, sendOtp, sendLoginOtp, verifyLoginOtp } from '../controllers/user.controller';

const router = Router();

router.post('/signup', signup);
router.post('/send-otp', sendOtp);
router.post('/login-otp-send', sendLoginOtp);
router.post('/login-otp-verify', verifyLoginOtp);

export default router;