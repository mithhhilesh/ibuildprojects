import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import photoRoutes from "./routes/photoRoutes.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({
    origin: "*", // later restrict to frontend URL
}));
app.use(express.json());

// ✅ Routes
app.use("/api/photos", photoRoutes);

app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

// ✅ MongoDB connection (ENV based)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log("Mongo ERROR ❌:", err.message));

// ✅ Dynamic PORT (IMPORTANT for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});