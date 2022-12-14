const router = require("express").Router();
const controller = require("../../controllers");
const validator = require("../../validator");
const middleware = require("../../middleware");

router.post(
  "/",
  middleware.role(["admin"]),
  middleware.multer.single("front"),
  validator.routes.product.create,
  controller.api.product.create
);
router.delete(
  ["/:_id", "/"],
  middleware.role(["admin"]),
  validator.routes.id,
  controller.api.product.delete
);

router.get(
  "/:_id",
  middleware.auth,
  validator.routes.id,
  controller.api.product.get.id
);

router.get("/find/:text", middleware.auth, controller.api.product.get.find);

router.get("/", controller.api.product.get.all);
module.exports = router;
