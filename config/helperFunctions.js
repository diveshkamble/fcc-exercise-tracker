const Users = require("../models/Users");
const mongoose = require("mongoose");
async function insertUsername(username) {
  const toCreateUsername = { username };
  const users = await Users.create(toCreateUsername);
  return users;
}

async function fetchAllUsername() {
  const usernameCollection = await Users.find();

  console.log(usernameCollection);
  return usernameCollection;
}

module.exports = { insertUsername, fetchAllUsername };
