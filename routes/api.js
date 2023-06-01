// Express import and imports of defined port
const express = require("express");
const router = express.Router();
const fs = require("fs");
let notesData = require("../db/db.json")
const uniqueID = require("../helpers/uuid")

// Path import
const path = require("path");

// GET route 
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

router.get('/notes', (req, res) => {
  res.json(notesData);
});

// POST route, return new note, add to json, and return to client,
router.post('/notes', (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uniqueID(),
    };

    notesData.push(newNote);

    let notesString = JSON.stringify(notesData);

    fs.writeFile(`./db/db.json`, notesString, (err) =>
      err ? console.error(err) : console.log(`Your new note, ${newNote.title}, has been added!`)
    );

    // give success response or report errors
    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    // 201 = request has succeeded and has led to the creation of a resource
    res.status(201).json(response);
  } else {
    // 500 = server-side error
    res.status(500).json('Error in adding note');
  }
});
module.exports = router;