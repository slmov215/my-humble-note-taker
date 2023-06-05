// Express import and imports of defined port
const express = require("express");
const router = express.Router();
const apiRoute = require("./api");

// Path import
const path = require("path");

// GET route 
router.get("/", (req, res) => {
  console.log("not crazy yet");
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

router.use("/api", apiRoute);

module.exports = router;