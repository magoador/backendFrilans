const { Router } = require("express");

const router = Router();

router.use("/users", require("./users.route"))
router.use("/work", require("./users.route"))

module.exports = router;