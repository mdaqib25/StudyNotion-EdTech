import mongoose, { Schema } from "mongoose";

const profileSchema = new Schema(
    {
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
        },

        dateOfBirth: {
            type: Date,
        },

        about: {
            type: String,
            trim: true,
            maxlength: 500,
        },

        contactNumber: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Profile", profileSchema);
