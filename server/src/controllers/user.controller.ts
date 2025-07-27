import { Request, Response } from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import { sendOtpEmail } from '../config/email';

const otpStore: { [email: string]: string } = {};

const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(409).json({ message: 'Email is already registered' });

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    otpStore[email] = otp;
    await sendOtpEmail(email, otp);
    
    setTimeout(() => { delete otpStore[email]; }, 300000);
    res.status(200).json({ message: 'OTP sent successfully to your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while sending OTP' });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, dateOfBirth, otp } = req.body;
    if (!name || !email || !dateOfBirth || !otp) return res.status(400).json({ message: 'All fields, including OTP, are required' });
    
    const storedOtp = otpStore[email];
    if (!storedOtp) return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    if (storedOtp !== otp) return res.status(400).json({ message: 'Invalid OTP.' });

    const newUser = await User.create({ name, email, dateOfBirth });
    delete otpStore[email];
    const token = generateToken(newUser.id);
    res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, name: newUser.name, email: newUser.email }, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error during signup', error });
  }
};

export const sendLoginOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found. Please create an account.' });

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    otpStore[email] = otp;
    await sendOtpEmail(email, otp);

    setTimeout(() => { delete otpStore[email]; }, 300000);
    res.status(200).json({ message: 'Login OTP sent successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const verifyLoginOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

    const storedOtp = otpStore[email];
    if (!storedOtp) return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    if (storedOtp !== otp) return res.status(400).json({ message: 'Invalid OTP.' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    delete otpStore[email];
    const token = generateToken(user.id);
    res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};