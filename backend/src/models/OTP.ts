import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            index: true,
        },

        otp: {
            type: String,
            required: true,
        },

        purpose: {
            type: String,
            enum: ["signup", "reset-password"],
            default: "signup",
        },

        attempts: {
            type: Number,
            default: 0,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            expires: 5 * 60,
        },
    },
    { timestamps: false }
);

export default mongoose.model("OTP", OTPSchema);
