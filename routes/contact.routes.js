const { Router } = require('express');
const contactController = require('../controllers/contactController');
const { verifyToken } = require("../middleware");
const router = Router();

router.get('/',[verifyToken.verifyToken],contactController.get_all);
router.post('/',[verifyToken.verifyToken],contactController.submit);

module.exports = router;