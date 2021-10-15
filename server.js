const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const uri = process.env.MONGO_URI;
const connectDB = require("./config/db");
app.use(cors());
connectDB();
const helperFunctions = require("./config/helperFunctions");
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", async (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  console.log(username);
  const get_result = await helperFunctions.insertUsername(username);
  console.log(get_result);
  if (get_result) return res.json({ username: username, _id: get_result._id });
  else return res.json({ error: "404" });
});

app.get("/api/users", async (req, res) => {
  const usernameList = await helperFunctions.fetchAllUsername();
  res.json(usernameList);
});

app.post("/api/users/:_id/exercises", async (req, res) => {
  id = req.params._id;
  const username = await helperFunctions.getUsername(id);
  const logObj = {
    description: req.body.description,
    duration: req.body.duration,
    date: req.body.date
      ? req.body.date.toDateString()
      : new Date().toDateString(),
  };
  const logObjUpdate = await helperFunctions.addToLog(id, logObj);
  res.json(logObjUpdate);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
