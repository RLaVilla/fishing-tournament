const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3000;
const filePath = "./participants.json";

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads/images";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Ensure the directory exists
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const loadParticipants = () => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

app.get("/participants", (req, res) => {
  const participants = loadParticipants();
  res.json(participants);
});

app.post("/participants", (req, res) => {
  const participants = req.body;
  fs.writeFileSync(filePath, JSON.stringify(participants, null, 2));
  res.json({ message: "Participants updated!" });
});

app.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageUrl = `/uploads/images/${req.file.filename}`;
  res.json({ imageUrl });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
