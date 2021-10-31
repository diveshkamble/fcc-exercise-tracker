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
  console.log("in get Log");
  console.log(opt);
  // let getExerciseLog;
  if (opt.fromDate != null && opt != null) {
    console.log("11");
    console.log("in opt");
    console.log(opt);
    fromDate = new Date(opt.from).toISOString();
    toDate = new Date(opt.to).toISOString();
    if (opt.limit === undefined) opt.limit = 100;
    let getExerciseLog = await Logs.findOne(
      {
        _id: id,
        "log.searchDate": {
          $gte: fromDate,
          $lte: toDate,
        },
      },
      {
        __v: 0,

        log: {
          $slice: Number(opt.limit),
        },
        //log: {
        // searchDate: 0,
        //},
      }
    );
    console.log(getExerciseLog);
    let logArray = getExerciseLog.log;
    logArray.sort((a, b) => {
      return b.searchDate - a.searchDate;
    });
    //console.log(logArray);

    let newLogArray = logArray.map((logs) => ({
      description: logs.description,
      duration: logs.duration,
      date: logs.date,
    }));

    //console.log(newLogArray);
    let newExerciseLog = {
      _id: getExerciseLog._id,
      username: getExerciseLog.username,
      from: new Date(opt.from).toDateString(),
      to: new Date(opt.to).toDateString(),
      count: getExerciseLog.count,
      log: newLogArray,
    };
    return newExerciseLog;
  } else if (opt.limit) {
    console.log("12");
    const getExerciseLog2 = await Logs.findOne(
      {
        _id: id,
      },
      {
        __v: 0,
      }
    );
    let logArray = getExerciseLog2.log;
    logArray.sort((a, b) => {
      return b.searchDate - a.searchDate;
    });

    let newLogArray = logArray.map((logs) => ({
      description: logs.description,
      duration: logs.duration,
      date: logs.date,
    }));

    for (i = 0; i < opt.limit; i++) {
      newLogArray.pop();
    }
    let newExerciseLog = {
      _id: getExerciseLog2._id,
      username: getExerciseLog2.username,
      count: opt.limit,
      log: newLogArray,
    };

    return newExerciseLog;
  } else {
    console.log("13");
    const getExerciseLog1 = await Logs.findOne(
      {
        _id: id,
      },
      {
        __v: 0,
        searchDate: 0,
      }
    );
    return getExerciseLog1;
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
