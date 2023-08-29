const { Router } = require('express');
// const { authenticateToken } = require('../middlewares/auth.middleware');
const { WorkTypeController } = require('../controllers/workType.controller');

const router = Router();

router.post('/create',  WorkTypeController.createWorkType)
router.get('/', WorkTypeController.getWorkType)

module.exports = router;