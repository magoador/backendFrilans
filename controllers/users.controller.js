const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.usersController = {
    CreateUser: async (req, res) => {
        const { login, password, admin } = req.body;

        // Проверка, не существует ли уже пользователь с таким логином
        const existingUser = await User.findOne({ login });
        if (existingUser) {
            return res.status(400).json("Пользователь с таким логином уже существует");
        }

        // Хеширование пароля перед сохранением в базу данных
        const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));

        // Создание нового пользователя с хешированным паролем
        const user = await User.create({ login, password: hash, admin });

        res.json(user);
    },

    UserLogin: async (req, res) => {
        const { login, password } = req.body;

        // Поиск пользователя по логину
        const candidate = await User.findOne({ login });
        if (!candidate) {
            return res.status(401).json("данные не верны");
        }

        // Проверка хешированного пароля с введенным паролем
        const valid = await bcrypt.compare(password, candidate.password);
        if (!valid) {
            return res.status(401).json("данные не верны");
        }

        // Создание JWT токена для аутентифицированного пользователя
        const payload = {
            id: candidate._id,
            login: candidate.login,
        };
        const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
            expiresIn: "24h",
        });

        // Отправка токена и идентификатора пользователя в ответе
        res.json({
            token,
            id: candidate._id,
        });
    },
}
