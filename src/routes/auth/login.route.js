const controller = require("../../controllers");
const router = require("express").Router();

router.post("/" ,controller.auth.login);

module.exports = router;