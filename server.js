const express = require("express");
const app = express();
const port = 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/styles.scss", (req, res) => {
  res.sendFile(__dirname + "/styles.scss");
});

app.get("/script.js", (req, res) => {
  res.sendFile(__dirname + "/script.js");
});

app.get("/_colors.scss", (req, res) => {
  res.sendFile(__dirname + "/_colors.scss");
});

app.get("/_stars.scss", (req, res) => {
  res.sendFile(__dirname + "/_stars.scss");
});

app.get("/assets/head_shot.jpg", (req, res) => {
  res.sendFile(__dirname + "/assets/head_shot.jpg");
});

app.get("/assets/nebula.jpg", (req, res) => {
  res.sendFile(__dirname + "/assets/nebula.jpg");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/submit-form", async (req, res) => {
  const searchItem = await req.body.searchForThis
  console.log(searchItem)

  res.send(`We can search for this item on our backend:  ${searchItem}`)


  //extract form data
  //
})