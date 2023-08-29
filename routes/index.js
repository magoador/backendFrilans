const { Router } = require("express");

const router = Router();

router.use("/users", require("./users.route"))
router.use("./work", require("./work.route"))
router.use('./workType', require("./workType.route"))

module.exports = router;