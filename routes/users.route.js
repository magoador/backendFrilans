const { Router } = require("express");
const {usersController} = require('../controllers/users.controller')

// Создание экземпляра маршрутизатора
const router = Router();

// Маршрут для регистрации нового пользователя
router.post("/register", usersController.CreateUser);

// Маршрут для аутентификации пользователя
router.post("/login", usersController.UserLogin);

// Экспорт созданного маршрутизатора для использования в других частях приложения
module.exports = router;
