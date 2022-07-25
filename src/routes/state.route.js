const controller = require("../controllers");
const router = require("express").Router();

router.get("/", controller.routes.states.get);

module.exports = router;
