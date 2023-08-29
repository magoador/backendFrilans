const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.usersController = {
    CreateUser: async (req, res) => {
        const { login, password, admin } = req.body;

        try {
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
        } catch (error) {
            console.error(error);
            res.status(500).json('Произошла ошибка при создании пользователя');
        }
    },

    UserLogin: async (req, res) => {
        const { login, password } = req.body;

        try {
            // Поиск пользователя по логину
            const candidate = await User.findOne({ login });
            if (!candidate) {
                return res.status(401).json("Данные не верны");
            }

            // Проверка хешированного пароля с введенным паролем
            const valid = await bcrypt.compare(password, candidate.password);
            if (!valid) {
                return res.status(401).json("Данные не верны");
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
        } catch (error) {
            console.error(error);
            res.status(500).json('Произошла ошибка при аутентификации пользователя');
        }
    },
    // Поиск пользователя по ID
    getUserById: async (req, res) => {
        const userId = req.params.id;

        try {
            // Поиск пользователя по ID
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json("Пользователь не найден");
            }

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json('Произошла ошибка при поиске пользователя по ID');
        }
    },

    // Добавление отзыва пользователю
    addUserReview: async (req, res) => {
        const { userId, text } = req.body;

        try {
            // Поиск пользователя по ID
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json("Пользователь не найден");
            }

            // Добавление отзыва в массив
            user.reviews.push({ user: req.user.id, text, timestamp: new Date() });

            await user.save();

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json('Произошла ошибка при добавлении отзыва');
        }
    },

    // Добавление оценки пользователю
    addUserScore: async (req, res) => {
        const { userId, score } = req.body;
    
        try {
            // Поиск пользователя по ID
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json("Пользователь не найден");
            }
            // Преобразование userId в ObjectId
            const userIdObject = mongoose.Types.ObjectId(userId);
    
            // Добавление оценки в массив
            user.score.push({ grade: score, user: userIdObject });
    
            await user.save();
    
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json('Произошла ошибка при добавлении оценки');
        }
    },

    
    // Удаление отзыва по индексу из массива
    deleteUserReview: async (req, res) => {
        const { userId, reviewIndex } = req.body;

        try {
            // Поиск пользователя по ID
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json("Пользователь не найден");
            }

            // Удаление отзыва по индексу
            user.reviews.splice(reviewIndex, 1);

            await user.save();

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json('Произошла ошибка при удалении отзыва');
        }
    }
};
