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

async function getLog(_id, opt) {
  console.log(opt);
  let getExerciseLog;
  if (opt) {
    fromDate = new Date(opt.from).toISOString();
    toDate = new Date(opt.to).toISOString();
    if (opt.limit === undefined) opt.limit = 100;
    getExerciseLog = await Logs.findOne(
      {
        _id: id,
        "log.searchDate": {
          $gte: fromDate,
          $lte: toDate,
        },
      },
      {
        __v: 0,
        searchDate: 0,
        log: {
          $slice: Number(opt.limit),
        },
      }
    );
    return getExerciseLog;
  } else {
    getExerciseLog = await Logs.findOne(
      {
        _id: id,
      },
      {
        __v: 0,
        searchDate: 0,
      }
    );
    return getExerciseLog;
  }

  //return getExerciseLog;
}

module.exports = {
  insertUsername,
  fetchAllUsername,
  getUsername,
  addToLog,
  getLog,
};
