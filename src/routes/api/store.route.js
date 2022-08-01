const controller = require("../../controllers");
const router = require("express").Router();
const validator = require("../../validator");
const middleware = require("../../middleware");

router.get("/", controller.api.store.all);
router.get("/:_id", validator.routes.id, controller.api.store.id);

// router.post("/:_id/categorie");

router.post(
  "/:_id/product/:categorie",
  validator.routes.store.pushproduct,
  controller.api.store.pushproduct
);

// new store
router.post(
  "/",
  middleware.multer.array("galery", 5),
  validator.routes.store.create,
  controller.api.store.create
);

// router.get(
//   "/:_id/categories/",
//   // validator.routes.id,
//   controller.api.store.categories
// );
module.exports = router;
