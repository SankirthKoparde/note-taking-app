import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (to: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Your OTP for HD Notes',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Welcome to HD Notes!</h2>
        <p>Your One-Time Password (OTP) to complete your registration is:</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">${otp}</p>
        <p>This OTP is valid for 5 minutes.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent successfully to ${to}`);
  } catch (error) {
    console.error(`Error sending OTP email:`, error);
    throw new Error('Could not send OTP email.');
  }
};