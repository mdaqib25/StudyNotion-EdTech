import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },

        accountType: {
            type: String,
            enum: ["Admin", "Student", "Instructor"],
            required: true,
        },

        additionalDetails: {
            type: Schema.Types.ObjectId,
            ref: "Profile",
        },

        courses: [
            {
                type: Schema.Types.ObjectId,
                ref: "Course",
            },
        ],

        image: {
            type: String,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        resetPasswordToken: {
            type: String,
        },

        resetPasswordExpires: {
            type: Date,
        },

        courseProgress: [
            {
                type: Schema.Types.ObjectId,
                ref: "CourseProgress",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);
