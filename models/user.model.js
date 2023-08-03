// Импорт модуля mongoose для работы с MongoDB
const mongoose = require("mongoose");

// Определение схемы пользователя с использованием mongoose.Schema
const userSchema = mongoose.Schema({

    // Поле для хранения логина пользователя (тип: строка)
    login: String,

    // Поле для хранения хешированного пароля пользователя (тип: строка)
    password: String,

    // Поле для хранения статуса администратора (тип: булево, значение по умолчанию: false)
    admin: {
        type: Boolean,
        default: false,
    },
});

// Создание модели "User" на основе определенной схемы
const User = mongoose.model("User", userSchema);

// Экспорт созданной модели для использования в других частях приложения
module.exports = User;
