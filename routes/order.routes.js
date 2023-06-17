const { Router } = require('express');
const orderController = require('../controllers/orderControllers');
const { verifyToken } = require("../middleware");
const router = Router();

router.get('/:id',[verifyToken.verifyToken],orderController.get_orders);
router.post('/:id',[verifyToken.verifyToken],orderController.checkout);

module.exports = router;