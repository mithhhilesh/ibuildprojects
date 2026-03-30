import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import photoRoutes from "./routes/photoRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/photos", photoRoutes);

mongoose.connect("mongodb+srv://admin:iBuildProjects%232026@ibuildprojects.f5rn8pu.mongodb.net/portfolio?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.log("ERROR:", err.message));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

app.get("/", (req, res) => {
    res.send("API is running 🚀");
});


