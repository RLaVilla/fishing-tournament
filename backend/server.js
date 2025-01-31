const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const filePath = "./participants.json";

app.use(cors());
app.use(express.json());

// Load participants from JSON
const loadParticipants = () => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

// Get all participants
app.get("/participants", (req, res) => {
  const participants = loadParticipants();
  res.json(participants);
});

// Update participant data
app.post("/participants", (req, res) => {
  const participants = req.body;
  fs.writeFileSync(filePath, JSON.stringify(participants, null, 2));
  res.json({ message: "Participants updated!" });
});

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
