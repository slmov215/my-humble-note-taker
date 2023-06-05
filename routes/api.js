// Express import and imports of defined port
const express = require("express");
const router = express.Router();
const fs = require("fs");
let notesDataBase = require("../db/db.json")
const uniqueID = require("../helpers/uuid")

router.get("/notes", (req, res) => {
  console.log("work please");
  res.json(notesDataBase);
});

// POST route, return new note, add to json, and return to client,
router.post("/notes", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uniqueID(),
    };

    notesDataBase.push(newNote);

    let noteString = JSON.stringify(notesDataBase, null, 4);

    fs.writeFile(`./db/db.json`, noteString, (err) =>
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
    res.status(500).json(`There's seem to be an error in adding your note...`);
  }
});

// Work on connecting Delete Function

router.delete('/notes/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile("./db/db.json", "utf8", (error, data) =>
  error ? console.error(error) : (notesDataBase = JSON.parse(data))
  );

  const deletedNote = notesDataBase.filter(note => note.id === req.params.id)

  if(deletedNote) {
      let filteredNotes = notesDataBase.filter(note => note.id != req.params.id)
      let notesString = JSON.stringify(filteredNotes, null, 4);
      fs.writeFile(`./db/db.json`, notesString, (err) =>
      err
      ? console.error(err)
      : console.log(`Note deleted!`));

      res.status(200).json(filteredNotes);
  } else {
      res.status(500).json('Error deleting note');
  }
});

module.exports = router;