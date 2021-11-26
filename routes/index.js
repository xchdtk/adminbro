const { Router } = require("express");
const router = Router();
const user = require("../controllers/user");

router.use("/user", user.get_user);

module.exports = router;
