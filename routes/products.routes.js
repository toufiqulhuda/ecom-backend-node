const express = require("express")
const router = express.Router()
const productController = require("../controllers/product.controller")
const { verifyToken } = require("../middleware");


// get all data
router.get("/", productController.all);
router.get("/:id", productController.getOne);
router.put("/:id",[verifyToken.verifyToken], productController.update);
router.delete("/:id", [verifyToken.verifyToken],productController.delete);
router.post("/",[verifyToken.verifyToken], productController.add);


module.exports = router;