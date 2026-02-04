import mongoose, { Schema } from "mongoose";

const subSectionSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        timeDuration: {
            type: Number, // duration in seconds
            required: true,
        },

        videoUrl: {
            type: String,
            required: true,
        },

        videoPublicId: {
            type: String, // for cloudinary / s3 delete
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("SubSection", subSectionSchema);
