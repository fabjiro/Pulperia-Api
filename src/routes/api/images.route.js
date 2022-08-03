const router = require("express").Router();
const controller = require("../../controllers");
const middleware = require("../../middleware");

router.post(
  "/",
  middleware.role(["admin", "owner"]),
  middleware.multer.array("images", 5),
  controller.api.images
);

module.exports = router;
