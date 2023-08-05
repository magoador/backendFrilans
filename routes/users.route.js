const { Router } = require("express");
const { usersController } = require('../controllers/users.controller')

// Создание экземпляра маршрутизатора
const router = Router();

// Маршрут для регистрации нового пользователя
router.post("/register", usersController.CreateUser);

// Маршрут для аутентификации пользователя
router.post("/login", usersController.UserLogin);

// Маршрут для получения информации о пользователе по ID
router.get("/:id", usersController.getUserById);

// Маршрут для добавления отзыва пользователю
router.post("/add-review", usersController.addUserReview);

// Маршрут для добавления оценки пользователю
router.post("/add-score", usersController.addUserScore);

// Маршрут для удаления отзыва пользователя
router.delete("/delete-review", usersController.deleteUserReview);

// Экспорт созданного маршрутизатора для использования в других частях приложения
module.exports = router;
