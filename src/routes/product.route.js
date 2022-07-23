const router = require("express").Router();
const controller = require("../controllers");
const validator = require("../validator");
const middleware = require("../middleware");

router.post(
  "/",
  middleware.multer.single("front"),
  validator.routes.product.create,
  controller.routes.product.create
);
router.delete("/:_id", validator.routes.id, controller.routes.product.delete);
router.get("/", controller.routes.product.all);
router.get("/:_id", validator.routes.id, controller.routes.product.id);

module.exports = router;
