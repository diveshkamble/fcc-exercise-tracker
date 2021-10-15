const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  description: {
    type: String,
    required: false,
  },
  duration: {
    type: Number,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  searchDate: {
    type: Date,
    require: false,
  },

  _id: false,
});

const LogsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  _id: {
    type: String,
    required: true,
  },
  log: {
    type: [subSchema],
    required: false,
  },
});

module.exports = mongoose.model("logs", LogsSchema);
