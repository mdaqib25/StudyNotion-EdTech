import mongoose, { Schema } from "mongoose";

const courseProgressSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        completedVideos: [
            {
                type: Schema.Types.ObjectId,
                ref: "SubSection",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("CourseProgress", courseProgressSchema);
