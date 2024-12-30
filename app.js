const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const formController = require("./controllers/formController");

dotenv.config({ path: "./config.env" });

const app = express();
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//MIDDLEWARE
app.use(express.static(`${__dirname}/public`));

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Connection error", error));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/submit-form", (req, res) => {
  formController.createFormEntry(req, res);
  res.sendFile(__dirname + '/public/formSubmissionSuccessful.html');
});

app.get("/pokedex", (req, res) => {
  res.sendFile(__dirname + '/public/projects/pokedex/pokedex.html');
});

app.get("/rpg", (req, res) => {
  res.sendFile(__dirname + '/public/projects/rpg/rpg.html');
});

app.get("/spotify", (req, res) => {
  res.sendFile(__dirname + '/public/projects/spotify/spotify.html');
});

module.exports = app;