// Express import
const express = require("express");
// File system module import
const fs = require("fs");
// Path import
const path = require("path");
// Data-Base 
const notesDataBase = require("./db/db.json")
const uniqueID = require("./helpers/uuid")

// Express function that creates new application 
const app = express();

// Port
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Required router
const routes = require("./routes");

// Use/link route to path
app.use("/", routes);

// App listener which starts the server
app.listen(PORT, () =>
    console.log(`My humble server is now listening at http://localhost:${PORT}`)
);
