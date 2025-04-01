const express = require("express");
const router = express.Router();
const { register, login, currentUser } = require("../controllers/CTauth");
const { authCheck, adminCheck,  } = require("../middlewares/authCheck");

router.post("/register", authCheck, adminCheck, register);
router.post("/login", login);
router.post("/current-User",authCheck, currentUser);
router.post("/current-Admin", authCheck, adminCheck, currentUser);

module.exports = router;
