const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 3000;
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/submit-form", async (req, res) => {
  const searchItem = await req.body.searchForThis;

  console.log(searchItem);

  res.send(`We can search for this item on our backend:  ${searchItem}`);

  ///extract form data
  ///do something with form data
  ///load a page that says Hey you successfully sent a message, click here to go back home
});