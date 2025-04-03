const express = require("express");
const router = express.Router();
const {
  saveWarehouse,
  listWarehouse,
  updateWarehouse,
  readWarehouse,
  removeWarehouse,
} = require("../controllers/CTwarehouse");
const { authCheck, adminCheck } = require("../middlewares/authCheck");
router.post("/warehouse", authCheck, adminCheck, saveWarehouse);
router.get("/warehouses", listWarehouse);
router.get("/warehouse/:id", authCheck, adminCheck, readWarehouse);
router.put("/warehouse/:id", authCheck, adminCheck, updateWarehouse);
router.delete("/warehouse/:id", authCheck, adminCheck, removeWarehouse);

module.exports = router;
