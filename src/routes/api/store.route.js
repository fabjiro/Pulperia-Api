const controller = require("../../controllers");
const router = require("express").Router();
const validator = require("../../validator");
const middleware = require("../../middleware");

// get store of zone
router.get(
  ["/:latitude/:longitude/:radius", "/:latitude/:longitude/"],
  middleware.auth,
  validator.routes.store.get.zone,
  controller.api.store.get.zone
);

// get info of store
router.get("/", controller.api.store.get.all);
router.get(
  "/:_id",
  middleware.role(["admin", "owner"]),
  validator.routes.id,
  controller.api.store.get.id
);
// get owner store
router.get(
  "/owner/:_id",
  middleware.auth,
  validator.routes.id,
  controller.api.store.get.owner
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
router.post(
  "/:_id/galery",
  middleware.role(["admin", "owner"]),
  validator.routes.store.push.galery,
  controller.api.store.push.galery
);
// push categorie to inventory
router.post(
  "/:_id/categorie",
  middleware.role(["admin", "owner"]),
  validator.routes.id,
  controller.api.store.push.categorie
);
// push product to categorie
router.post(
  "/:_id/product/:categorie",
  middleware.role(["admin", "owner"]),
  validator.routes.store.push.product,
  controller.api.store.push.products
);

module.exports = router;
