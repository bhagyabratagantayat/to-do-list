const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();
const path = require("path");

const port = process.env.YOUR_PORT;

app.use(express.urlencoded({ extended: true })); // form data ke liye
app.use(express.json()); // JSON data ke liye

// app.use(methodOverride('_method')); // download pkg for using
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let todo = [
  {
    task: "eat",
  },
  {
    task: "drink",
  },
  {
    task: "bark",
  },
  {
    task: "sleep",
  },
];
app.get("/home", (req, res) => {
  //   let { task } = todo;
  res.render("index.ejs", { todo: todo });
});

app.post("/home", (req, res) => {
  let { task } = req.body;
  todo.push({ task }); // push task
  res.redirect("/home"); // redirect / refresh
});

app.listen(port, (req, res) => {
  console.log(`listen port: ${port}`);
});
