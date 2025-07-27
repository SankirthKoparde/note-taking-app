import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FloatingLabelInput } from '../components/FloatingLabelInput';
import { sendLoginOtpRequest, verifyAndSignin } from '../services/userService';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSendOtp = async () => {
    setError('');
    setSuccess('');
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    try {
      await sendLoginOtpRequest(email);
      setSuccess('An OTP has been sent to your email.');
      setOtpSent(true);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to send OTP.';
      setError(errorMessage);
    }
  };

  const handleLogin = async () => {
    setError('');
    setSuccess('');
    if (!email || !otp) {
      setError('Email and OTP are required.');
      return;
    }
    try {
      const response = await verifyAndSignin({ email, otp });
      auth.login(response.data.token, response.data.user);
      navigate('/');  
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed.';
      setError(errorMessage);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      handleSendOtp();
    } else {
      handleLogin();
    }
  };

  const emailIcon = <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
  const otpIcon = <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="flex flex-col w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden lg:flex-row">
        
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-sm">
            
            <div className="flex items-center space-x-3"><img src="/logo.png" alt="HD Logo" className="w-10 h-10" /><span className="text-3xl font-black text-gray-900 tracking-tight">HD</span></div>

            <div className="mt-8"><h2 className="text-4xl font-black text-gray-900 tracking-tight">Sign in</h2><p className="mt-2 text-base text-gray-600">Please login to continue to your account.</p></div>
            
            {error && <div className="mt-4 text-center text-sm text-red-600 bg-red-100 p-3 rounded-lg">{error}</div>}
            {success && <div className="mt-4 text-center text-sm text-green-600 bg-green-100 p-3 rounded-lg">{success}</div>}
            
            <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
              <FloatingLabelInput id="email" type="email" label="Email" icon={emailIcon} value={email} onChange={(e) => setEmail(e.target.value)} required disabled={otpSent} placeholder="jonas_kahnwald@gmail.com" />
              
              {otpSent && (
                <FloatingLabelInput id="otp" type="text" label="OTP" icon={otpIcon} value={otp} onChange={(e) => setOtp(e.target.value)} required placeholder="Enter OTP" />
              )}
              
              {otpSent && (
                 <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      <label htmlFor="remember-me" className="ml-2 block text-gray-900">Keep me logged in</label>
                    </div>
                    <button type="button" onClick={handleSendOtp} className="font-medium text-blue-600 hover:underline">Resend OTP</button>
                  </div>
              )}

              <button type="submit" className="w-full px-6 py-4 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700">
                {otpSent ? 'Sign in' : 'Get OTP'}
              </button>
            </form>

            <p className="mt-8 text-sm text-center text-gray-500">
              Need an account?{' '}
              <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:block lg:w-1/2 bg-center bg-cover" style={{ backgroundImage: "url('/windows-11-wave.jpg')" }} />
      </div>
    </div>
  );
};

export default Signin;