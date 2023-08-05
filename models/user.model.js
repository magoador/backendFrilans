const mongoose = require('mongoose');

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

    // Поле для хранения отзывов пользователя
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Ссылка на модель User
            required: true
        },
        text: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],

    // Поле для хранения оценок пользователя
    score: [{
        grade: {
            type: Number,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Ссылка на модель User
            required: true
        },
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
