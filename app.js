const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// In-memory database for simplicity
let users = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index", { users });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (users.find((user) => user.username === username)) {
    res.send("Username already exists!");
  } else {
    users.push({ username, password });
    res.redirect("/");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    res.send(`Welcome back, ${username}!`);
  } else {
    res.send("Invalid username or password!");
  }
});

// Start server
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
