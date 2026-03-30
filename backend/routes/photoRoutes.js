import express from "express";
import multer from "multer";
import Photo from "../models/Photo.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ THIS ROUTE MUST EXIST
router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const { title, category, location, story } = req.body;

        const result = await cloudinary.uploader.upload(req.file.path);

        const newPhoto = new Photo({
            title,
            category,
            location,
            story,
            imageUrl: result.secure_url,
        });

        await newPhoto.save();

        res.json(newPhoto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/", async (req, res) => {
    const photos = await Photo.find();
    res.json(photos);
});

export default router;