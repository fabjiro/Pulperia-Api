const controller = require("../../controllers");
const router = require("express").Router();
const middleware = require("../../middleware");


router.get("/",middleware.auth ,controller.api.states.get);

module.exports = router;
