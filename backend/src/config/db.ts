import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDb Connected");

    } catch (error) {
        console.log("MongoDB Connection failed", error);
    }
};
export default connectDB;