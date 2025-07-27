import api from './api';

// --- SIGN UP ---
interface SignUpData {
  name: string;
  email: string;
  dateOfBirth: Date | null;
  otp: string;
}

export const sendOtpRequest = (email: string) => {
  return api.post('/users/send-otp', { email });
};

export const verifyAndSignup = (data: SignUpData) => {
  return api.post('/users/signup', data);
};


// --- SIGN IN (Add these new functions) ---
interface SignInData {
    email: string;
    otp: string;
}

export const sendLoginOtpRequest = (email: string) => {
    return api.post('/users/login-otp-send', { email });
};

export const verifyAndSignin = (data: SignInData) => {
    return api.post('/users/login-otp-verify', data);
};