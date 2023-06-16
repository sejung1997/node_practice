const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  day: {
    type: Date,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comments", commentsSchema);
