const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  work: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Work",
  },
  message: {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    executor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: String,
    date: Date,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
