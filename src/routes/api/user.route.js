const controller = require("../../controllers");
const router = require("express").Router();
const validator = require("../../validator");
const middleware = require("../../middleware");

router.get("/", middleware.role(['admin']) ,controller.api.users.all);
router.get("/:_id",validator.routes.id, controller.api.users.id);

router.post("/", middleware.multer.single("photo"), validator.routes.user.create, controller.api.users.create);
router.put("/:_id", middleware.multer.single("photo"), validator.routes.id,controller.api.users.update);
module.exports = router;