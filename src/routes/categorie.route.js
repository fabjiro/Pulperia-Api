const router = require("express").Router();
const controller = require("../controllers");
const validator = require("../validator");

router.post(
  "/",
  validator.routes.categorie.create,
  controller.routes.categorie.create
);
router.get(
  "/:_id/products",
  validator.routes.id,
  controller.routes.categorie.product
);
router.put(
  "/",
  validator.routes.categorie.edit,
  controller.routes.categorie.edit
);
router.delete("/:_id", validator.routes.id, controller.routes.categorie.delete);
router.get("/", controller.routes.categorie.all);
router.get("/:_id", validator.routes.id, controller.routes.categorie.id);

module.exports = router;
