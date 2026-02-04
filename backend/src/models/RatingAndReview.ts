import mongoose, { Schema } from "mongoose";

const ratingAndReviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    review: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// one user can review a course only once
ratingAndReviewSchema.index(
  { user: 1, course: 1 },
  { unique: true }
);

export default mongoose.model("RatingAndReview", ratingAndReviewSchema);
