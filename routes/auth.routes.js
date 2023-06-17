const express = require("express")
const router = express.Router()
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

router.get("/", async(req, res) => {
    return res.status(200).json({message: "route works"})
})
router.post(
          "/signup",
          [
            verifySignUp.checkDuplicateUsernameOrEmail,
            // verifySignUp.check_allowed_role
          ],
          controller.signup
        );
router.post("/signin", controller.signin);
router.post("/signout", controller.signout);

module.exports = router;
