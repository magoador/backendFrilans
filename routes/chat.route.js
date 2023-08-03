const { Router } = require("express");
const { chatController } = require("../controllers/chat.controller");

const router = Router();

router.post("/chat", chatController.addChat);
router.patch("/chat/message", chatController.addMessage);
router.get("/chat/:id", chatController.getChatById);

module.exports = router;
