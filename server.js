// Express import
const express = require("express");
// File system module import
const fs = require("fs");
// Path import
const path = require("path");
// Data-Base 
const dataBase = require("./db/db.json")
const uniqueID = require("./helpers/uuid")



// Express function that creates new application 
const app = express();

// Port
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// GET route 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
  
  app.get('/notes', (req, res) => {
    res.json(dataBase);
  });
  
  // POST route, return new note, add to json, and return to client,
  app.post('/notes', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
      const newNote = {
        title,
        text,
        id: uniqueID(),
      };
  
      dataBase.push(newNote);
  
      let notesString = JSON.stringify(dataBase);
  
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


// Required router
// const apiRouter = require("./routes/api");

// Use/link route to path
// app.use("/api", apiRouter);

// App listener which starts the server
app.listen(PORT, () =>
    console.log(`My humble server is now listening at http://localhost:${PORT}`)
);
