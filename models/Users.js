const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", UsersSchema);
