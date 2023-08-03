const { Chat } = require("../models/Chat.model");

module.exports.chatController = {
  addChat: async (req, res) => {
    try {
      const { work, customer, executor, text, date } = req.body;

      const addedChat = Chat.create({
        work,
        message: {
          customer,
          executor,
          text,
          date,
        },
      });

      return res.json(addedChat);
    } catch (err) {
      return res.json(err);
    }
  },

  addMessage: async (req, res) => {
    try {
      const { customer, executor, text, date } = req.body;

      const addedMessage = Chat.findByIdAndUpdate(req.params.id, {
        message: {
          customer,
          executor,
          text,
          date,
        },
      });

      return res.json(addedMessage);
    } catch (err) {
      return res.json(err);
    }
  },

  getChatById: async (req, res) => {
    try {
      const chatById = Chat.findOneById(req.params.id);

      return res.json(chatById);
    } catch (err) {
      return res.json(err);
    }
  },
};
