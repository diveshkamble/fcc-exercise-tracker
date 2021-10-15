const Users = require("../models/Users");
const Logs = require("../models/Logs");
const mongoose = require("mongoose");
async function insertUsername(username) {
  const toCreateUsername = { username };
  const users = await Users.create(toCreateUsername);
  const logObj = { username: users.username, _id: users._id };
  const logs = await Logs.create(logObj);
  console.log(users);
  return users;
}

async function fetchAllUsername() {
  const usernameCollection = await Users.find();

  console.log(usernameCollection);
  return usernameCollection;
}

async function getUsername(_id) {
  const username = await Users.find({ _id: _id });
  return username[0].username;
}

async function addToLog(_id, logObj) {
  const usernameObj = await Users.find({ _id: _id });
  username = usernameObj[0].username;
  const logObjUpdate = await Logs.findOneAndUpdate(
    { _id: _id },
    {
      $inc: { count: 1 },
      $push: {
        log: logObj,
      },
    }
  );
  const itemToReturn = {
    _id: _id,
    username: usernameObj[0].username,
    date: logObj.date,
    duration: Number(logObj.duration),
    description: logObj.description,
  };

  return itemToReturn;
}

async function getLog(_id) {
  const getExerciseLog = await Logs.findOne({ _id: id }).select(["-__v"]);
  return getExerciseLog;
}

module.exports = {
  insertUsername,
  fetchAllUsername,
  getUsername,
  addToLog,
  getLog,
};
