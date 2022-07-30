const router = require("express").Router();
const controller = require("../../controllers");
const middleware = require("../../middleware");
const validator = require("../../validator");

router.get("/", controller.api.categorie.all);

router.get(
  "/:_id/products",
  middleware.auth,
  validator.routes.id,
  controller.api.categorie.product
);
router.get(
  "/:_id",
  middleware.auth,
  validator.routes.id,
  controller.api.categorie.id
);

router.post(
  "/",
  middleware.role(["admin"]),
  validator.routes.categorie.create,
  controller.api.categorie.create
);
router.put(
  "/",
  middleware.role(["admin"]),
  validator.routes.categorie.edit,
  controller.api.categorie.edit
);
router.delete(
  ["/:_id", "/"],
  middleware.role(["admin"]),
  validator.routes.id,
  controller.api.categorie.delete
);

module.exports = router;
