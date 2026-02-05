import OTP from "../models/OTP.js";
import mailSender from "../utils/mailSender.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Profile from "../models/Profile.js";

interface SignUpPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    accountType: "Admin" | "Student" | "Instructor";
    contactNumber?: string;
    otp: string;
}
// generate 6 digit otp
const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

//Send OTP service
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

// Sign Up Service
export const signUpService = async ({
    firstName,
    lastName,
    email,
    password,
    accountType,
    contactNumber,
    otp,
}: SignUpPayload) => {

    // check user existing 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("user already registered")
    }
    // get latest otp
    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!recentOtp) {
        throw new Error("Invalid Otp")
    }
    // validate otp 
    if (recentOtp.otp !== otp) {
        throw new Error("Invalid OTP");
    }
    // hash password 
    const hashedPassword = await bcrypt.hash(password, 10);
    // create profile 
    const profile = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: contactNumber || null,
    })
    // create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        accountType,
        additionalDetails: profile._id,
        isVerified: true,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    })
    // cleanup otp
    await OTP.deleteMany({ email });
    // return user 
    return user;
};

// Login Service 
export const loginService = async (email: string, password: string) => {
    // find user
    const user = await User.findOne({ email })
        .populate("additionalDetails")
        .select("+password");

    if (!user) {
        throw Error("User not registered");
    }
    // check email verification
    if (!user.isVerified) {
        throw new Error("Email not verified");
    }
    // compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid Password");
    }
    // generate JWT
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            accountType: user.accountType,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "2h",
        }
    )
    // remove sensitive fields return safe payLoad
    const { password: _, ...safeUser } = user.toObject();

    return {
        user: safeUser,
        token,
    };
};








