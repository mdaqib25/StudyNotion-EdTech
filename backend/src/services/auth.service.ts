import OTP from "../models/OTP.js";
import mailSender from "../utils/mailSender.js";

// generate 6 digit otp
const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

//Send OTP to user's email
export const sendOtpService = async (email: string): Promise<void> => {
    // generate otp
    const otp = generateOTP();
    // save otp in DB (temporary)
    await OTP.create({
        email,
        otp,
    });
    // send otp mail
    const mailSent = await mailSender({
        email,
        title: "Verification Email",
        body: `
      <div>
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      </div>
    `,
    });
    if (!mailSent) {
        throw new Error("Failed to send OTP email");
    }
};
