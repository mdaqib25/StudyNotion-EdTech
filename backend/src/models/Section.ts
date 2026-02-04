import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema(
    {
        sectionName: {
            type: String,
            required: true,
            trim: true,
        },

        subSections: [
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

export default mongoose.model("Section", sectionSchema);
