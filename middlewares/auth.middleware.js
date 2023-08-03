const jwt = require("jsonwebtoken");

// Middleware функция для проверки JWT токена
const authenticateToken = (req, res, next) => {
    try {
        // Извлечение токена из заголовков запроса
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json("Отсутствует токен аутентификации");
        }

        // Верификация (проверка) токена с использованием секретного ключа
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT_KEY);

        // Добавление данных пользователя в объект запроса для последующего использования
        req.user = decodedToken;

        // Продолжение выполнения следующих действий
        next();
    } catch (error) {
        return res.status(401).json("Неверный или истекший токен аутентификации");
    }
};

module.exports = authenticateToken;
