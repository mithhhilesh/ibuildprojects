import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    title: String,
    category: String,
    imageUrl: String,
    location: String,
    story: String,
}, { timestamps: true });

export default mongoose.model("Photo", photoSchema);