const { Router } = require('express');
const { workController } = require('../controllers/work.controller');
const { authenticateToken } = require('../middlewares/auth.middleware')

const router = Router();

// Создание новой работы (защищенный маршрут)
router.post('/create', authenticateToken, workController.createWork);

// Получение списка всех работ
router.get('/all', workController.getAllWorks);

// Удаление работы по ID (защищенный маршрут)
router.delete('/:id', authenticateToken, workController.deleteWork);

// Изменение данных работы по ID (защищенный маршрут)
router.put('/:id', authenticateToken, workController.updateWork);

module.exports = router;
