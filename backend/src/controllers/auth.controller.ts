import type { Request, Response } from "express";
import { sendOtpService, signUpService, loginService } from "../services/auth.service.js";

// send OTP
export const sendOTP = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        await sendOtpService(email);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });
    } catch (error) {
        console.error("Send OTP Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to send OTP",
        });
    }
};

// signUp
export const signUp = async (req: Request, res: Response) => {
    try {
        // data fetched
        const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = req.body;
        // validate input 
        if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !contactNumber || !otp) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            })
        }
        // password match 
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm Password do not match",
            })
        }
        // asking service to register user and wait for the result
        const user = await signUpService({
            firstName,
            lastName,
            email,
            password,
            accountType,
            contactNumber,
            otp
        });
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error: any) {
        console.error("Signup Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message || "SignUp Failed",
        });
    }
};

// Login
export const login = async (req: Request, res: Response) => {
    try {
        // get data from
        const { email, password } = req.body;
        // validate data
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        // call LoginService
        const { user, token } = await loginService(email, password)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        })
        // send response
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            user,
        });

    } catch (error: any) {
        console.error("Login Error:", error.message);

        return res.status(401).json({
            success: false,
            message: error.message || "Login Failed",
        })
    }
};


// changePassword
