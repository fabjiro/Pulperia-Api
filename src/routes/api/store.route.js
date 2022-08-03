const controller = require("../../controllers");
const router = require("express").Router();
const validator = require("../../validator");
const middleware = require("../../middleware");

// get info of store
router.get("/", controller.api.store.all);
router.get(
  "/:_id",
  middleware.role(["admin", "owner"]),
  validator.routes.id,
  controller.api.store.id
);
// get owner store
router.get(
  "/owner/:_id",
  middleware.auth,
  validator.routes.id,
  controller.api.store.owner
);
//get inventory
router.get(
  "/:_id/inventory",
  middleware.auth,
  validator.routes.id,
  controller.api.store.inventory
);
// new store
router.post(
  "/",
  middleware.role(["admin", "owner"]),
  validator.routes.store.create,
  controller.api.store.create
);

// delete store
router.delete(
  "/:_id",
  middleware.role(["admin", "owner"]),
  validator.routes.id,
  controller.api.store.delete
);
// delete img galery
// delete categorie
// delete product

//push img to galery
// push categorie to inventory
router.post(
  "/:_id/categorie",
  middleware.role(["admin", "owner"]),
  validator.routes.id,
  controller.api.store.pushcategorie
);
// push product to categorie
router.post(
  "/:_id/product/:categorie",
  middleware.role(["admin", "owner"]),
  validator.routes.store.pushproduct,
  controller.api.store.pushproduct
);

module.exports = router;
