const express = require("express");
const router = express.Router();
const {
  listUser,
  ChangeStatus,
  ChangeRole,
  userCart,
  getUserCart,
  clearUserCart,
  saveNameCum,
  saveOrder,
  getOrder,
} = require("../controllers/CTuser");
const { authCheck, adminCheck } = require("../middlewares/authCheck");

router.get("/users", authCheck, adminCheck, listUser);
router.post("/change-status", authCheck, adminCheck, ChangeStatus);
router.post("/change-role", authCheck, adminCheck, ChangeRole);

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart/:id", authCheck, clearUserCart);

router.post("/user/namecum", authCheck, saveNameCum);

router.post("/user/order/:id", authCheck, saveOrder);
router.get("/user/order", authCheck, getOrder);

module.exports = router;
