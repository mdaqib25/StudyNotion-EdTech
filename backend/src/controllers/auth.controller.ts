import type { Request, Response } from "express";
import { sendOtpService } from "../services/auth.service.js";

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
// Login
// changePassword
