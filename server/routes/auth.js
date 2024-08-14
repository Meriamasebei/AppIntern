const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bancdbModel = require('../models/bancdb');
const authJwt = require('../middleware/authJwt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const router = express.Router();

// Secrets for JWT
const ACCESS_TOKEN_SECRET = 'youraccesstokensecret';
const REFRESH_TOKEN_SECRET = 'yourrefreshtokensecret';
const RESET_PASSWORD_SECRET = 'yourresetpasswordsecret';
const OTP_SECRET = 'yourotpsecret'; // Secret for OTP generation

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'maryem.sebeii@gmail.com',
        pass: 'molr mgam jasa rstx' // App-specific password or use environment variable
    }
});

// Temporary storage for OTPs
const otps = {};

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await bancdbModel.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const accessToken = jwt.sign({ email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
                const refreshToken = jwt.sign({ email: user.email }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

                user.refreshToken = refreshToken;
                await user.save();

                res.cookie('refreshToken', refreshToken, { httpOnly: true, path: '/' });
                res.json({ accessToken, refreshToken });
            } else {
                res.status(401).json("Incorrect email or password");
            }
        } else {
            res.status(401).json("Incorrect email or password");
        }
    } catch (err) {
        console.error('Error handling login request:', err);
        res.status(500).json("Internal server error");
    }
});

// Token endpoint
router.post('/token', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(403).json({ message: 'No token provided!' });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }

        const user = await bancdbModel.findOne({ email: decoded.email });

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token!' });
        }

        const newAccessToken = jwt.sign({ email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        return res.json({ accessToken: newAccessToken });
    });
});

// Logout endpoint
router.post('/logout', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(403).json({ message: 'No token provided!' });
    }

    try {
        const { email } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const user = await bancdbModel.findOne({ email });

        if (user) {
            user.refreshToken = '';
            await user.save();
            res.clearCookie('refreshToken');
            res.json({ message: 'Logged out successfully' });
        } else {
            res.status(404).json("No record found");
        }
    } catch (err) {
        console.error('Error handling logout request:', err);
        res.status(500).json("Internal server error");
    }
});

// Forgot Password endpoint
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await bancdbModel.findOne({ email });
        if (!user) {
            return res.status(404).json("User not found");
        }

        const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP

        const mailOptions = {
            from: 'maryem.sebeii@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        };

        await transporter.sendMail(mailOptions);
        otps[email] = otp;
        res.json({ message: 'OTP sent to your email' });
    } catch (err) {
        console.error('Error sending OTP email:', err);
        res.status(500).json("Internal server error");
    }
});

// Verify OTP endpoint
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    if (otps[email] && otps[email] === otp) {
        delete otps[email];
        const resetToken = jwt.sign({ email }, RESET_PASSWORD_SECRET, { expiresIn: '15m' }); // Generate reset token
        res.json({ message: 'OTP verified successfully', resetToken });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
});

// Resend OTP endpoint
router.post('/resend-otp', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await bancdbModel.findOne({ email });
        if (!user) {
            return res.status(404).json("User not found");
        }

        const otp = crypto.randomInt(100000, 999999).toString(); // Generate new 6-digit OTP

        const mailOptions = {
            from: 'maryem.sebeii@gmail.com',
            to: email,
            subject: 'Resend OTP',
            text: `Your new OTP code is ${otp}`
        };

        await transporter.sendMail(mailOptions);
        otps[email] = otp;
        res.json({ message: 'New OTP sent to your email' });
    } catch (err) {
        console.error('Error resending OTP email:', err);
        res.status(500).json("Internal server error");
    }
});

// Reset Password endpoint
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token) {
        return res.status(400).json({ message: "No token provided" });
    }

    try {
        jwt.verify(token, RESET_PASSWORD_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid or expired token" });
            }

            const user = await bancdbModel.findOne({ email: decoded.email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();

            res.json({ success: true, message: "Password reset successfully" });
        });
    } catch (err) {
        console.error('Error handling password reset:', err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Protected endpoint
router.get('/protected', authJwt, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId });
});

module.exports = router;
