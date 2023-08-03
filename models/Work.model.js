const mongoose = require("mongoose");

// Определение схемы для модели "Работа"

const workSchema = new mongoose.Schema({
  // Поле для хранения идентификатора пользователя, добавившего работу
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Ссылка на модель User
    required: true,
  },

  // Поле для хранения ссылки на тип работы (связь с моделью WorkType)
  workType: {
    type: mongoose.Schema.Types.ObjectId, // Тип: ObjectId
    ref: "WorkType", // Ссылка на модель WorkType
    required: true,
  },

  status: {
    type: Boolean,
    default: false,
  },

  finish: {
    type: Boolean,
    default: false,
  },

  // Поле для хранения предмета работы
  subject: {
    type: String,
    required: true,
  },

  // Поле для хранения названия работы
  title: {
    type: String,
    required: true,
  },

  // Поле для хранения срока сдачи работы (в формате даты)
  deadline: {
    type: Date,
    required: true,
  },

  // Поле для хранения даты добавления работы (по умолчанию - текущая дата)
  dateAdded: {
    type: Date,
    default: Date.now, // Значение по умолчанию - текущая дата
  },

  // Поле для хранения описания работы
  description: {
    type: String,
    required: true,
  },

  // Поле для хранения цены работы
  price: {
    type: Number,
    required: true,
  },

  responded: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Создание модели "Работа" на основе определенной схемы
const Work = mongoose.model("Work", workSchema);

// Экспорт созданной модели для использования в других частях приложения
module.exports = Work;
