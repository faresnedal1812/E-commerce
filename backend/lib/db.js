import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully:", conn.connection.host);
  } catch (error) {
    console.log("Error in MongoDB connection", error.message);
    process.exit(1);
  }
};
