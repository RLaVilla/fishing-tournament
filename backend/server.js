const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const filePath = "./participants.json";

app.use(cors());
app.use(express.json());


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


app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
