import express from "express";
import multer from "multer";
import Issue from "../models/Issue.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// User submits issue
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    const issue = await Issue.create({ ...req.body, images: imagePaths });
    res.json(issue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Govt gets all issues
router.get("/", protect, async (req, res) => {
  const issues = await Issue.find().sort({ createdAt: -1 });
  res.json(issues);
});

// Govt updates issue status
router.patch("/:id", protect, async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(issue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// User checks single issue
router.get("/:id", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    res.json(issue);
  } catch (err) {
    res.status(404).json({ message: "Issue not found" });
  }
});

export default router;