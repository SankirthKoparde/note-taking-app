import { Request, Response } from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import { sendOtpEmail } from '../config/email'; // Import the email sending function

// Temporary in-memory store for OTPs. 
// In a real production app, you would use a database or a service like Redis.
const otpStore: { [email: string]: string } = {};

/**
 * @desc    Generate and send an OTP for a new email address.
 * @route   POST /api/users/send-otp
 */
export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    // Generate a 6-digit numeric OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Store the OTP associated with the user's email
    otpStore[email] = otp;

    // Send the OTP to the user's email address
    await sendOtpEmail(email, otp);
    
    // Set a timeout to expire the OTP after 5 minutes (300000 ms)
    setTimeout(() => {
      delete otpStore[email];
    }, 300000);

    res.status(200).json({ message: 'OTP sent successfully to your email.' });
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).json({ message: 'Server error while sending OTP' });
  }
};

/**
 * @desc    Register a new user after verifying the OTP.
 * @route   POST /api/users/signup
 */
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, dateOfBirth, otp } = req.body;

    // 1. Validate all required inputs are present
    if (!name || !email || !dateOfBirth || !otp) {
      return res.status(400).json({ message: 'All fields, including OTP, are required' });
    }

    // 2. Verify the OTP
    const storedOtp = otpStore[email];
    if (!storedOtp) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }
    if (storedOtp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    // 3. Create the new user in the database
    const newUser = await User.create({
      name,
      email,
      dateOfBirth,
    });
    
    // 4. Clean up the used OTP from the store
    delete otpStore[email];
    
    // 5. Generate a JWT for the new user
    const token = generateToken(newUser.id);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during signup', error });
  }
};

/**
 * @desc    Helper function to generate a JWT.
 * @param   id The user's ID.
 */
const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

// At the top of the file or in a separate .d.ts file:
declare module 'otp-generator';