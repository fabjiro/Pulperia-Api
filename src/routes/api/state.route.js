const controller = require("../../controllers");
const router = require("express").Router();

router.get("/", controller.api.states.get);

module.exports = router;
