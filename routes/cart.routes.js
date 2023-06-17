const { Router } = require('express');
const cartController = require('../controllers/cartControllers');
const { verifyToken } = require("../middleware");
const router = Router();

router.get('/:id',[verifyToken.verifyToken],cartController.get_cart_items);
router.post('/:id',[verifyToken.verifyToken],cartController.add_cart_item);
router.delete('/:userId/:itemId',[verifyToken.verifyToken],cartController.delete_item);

module.exports = router;