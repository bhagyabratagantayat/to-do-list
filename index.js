const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const path = require("path");

const port = process.env.YOUR_PORT;

app.use(express.urlencoded({ extended: true })); // form data ke liye
app.use(express.json()); // JSON data ke liye

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// default data
let todo = [
  {
    id: uuidv4(),
    task: "Buy groceries (milk, bread, fruits, vegetables)",
  },
  {
    id: uuidv4(),
    task: "Pay electricity and internet bills",
  },
  {
    id: uuidv4(),
    task: "Clean the room and organize the desk",
  },
  {
    id: uuidv4(),
    task: "Do laundry and fold clothes",
  },
  {
    id: uuidv4(),
    task: "Cook a healthy dinner",
  },
  {
    id: uuidv4(),
    task: "Water the plants",
  },
  {
    id: uuidv4(),
    task: "Call parents/friends to check in",
  },
  {
    id: uuidv4(),
    task: "Do a 20-minute workout or yoga session",
  },
  {
    id: uuidv4(),
    task: "Read a book or listen to a podcast before bed",
  },
  {
    id: uuidv4(),
    task: "Plan next day’s tasks and schedule",
  },
];


// home route
app.get("/home", (req, res) => {
  //   let { task } = todo;
  res.render("index.ejs", { todo: todo });
});

// add task
app.post("/home", (req, res) => {
  let { task } = req.body;
  if (task && task.trim() !== "") {
    todo.push({ task: task.trim(), id: uuidv4() }); // push task into fake db
  }
  res.redirect("/home"); // redirect / refresh
});



// update task
app.patch("/home/:id", (req, res) => {
  let { id } = req.params;
  let { task } = req.body;

  let foundTask = todo.find((p) => p.id === id);
  if (foundTask) {
    foundTask.task = task;
  }

  res.redirect("/home");
});

// show edit form
app.get("/home/:id/edit", (req, res) => {
  let { id } = req.params;
  let task = todo.find((p) => id === p.id);
  res.render("edit.ejs", { task });
});

// dlt task
app.delete("/home/:id", (req, res) => {
  let { id } = req.params;
  todo = todo.filter((t) => t.id !== id); // jis task ka id match nahi kare usko rakho
  res.redirect("/home");
});

app.listen(port, (req, res) => {
  console.log(`listen port: ${port}`);
});
