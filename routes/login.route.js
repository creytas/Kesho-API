const router = require("express").Router();

const loginMiddleware = require("../middleware/login.middleware");
router.post("/login", loginMiddleware);

module.exports = router;
