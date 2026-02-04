import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
    {
        courseName: {
            type: String,
            required: true,
            trim: true,
        },

        courseDescription: {
            type: String,
            required: true,
        },

        instructor: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        whatYouWillLearn: {
            type: String,
            required: true,
        },

        courseContent: [
            {
                type: Schema.Types.ObjectId,
                ref: "Section",
            },
        ],

        ratingAndReviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "RatingAndReview",
            },
        ],

        price: {
            type: Number,
            required: true,
        },

        thumbnail: {
            type: String,
            required: true,
        },

        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tag",
            },
        ],

        studentsEnrolled: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Course", courseSchema);
