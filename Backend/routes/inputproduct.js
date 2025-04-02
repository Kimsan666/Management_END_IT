const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/authCheck");
const {
  saveInputProduct,
  listInputProduct,
  updateInputProduct,
  readInputProduct,
  removeInputProduct,
  searchfiltersInputproduct,
} = require("../controllers/CTinputproduct");

router.post("/inputproduct", authCheck, adminCheck, saveInputProduct);
router.get("/inputproducts", authCheck, adminCheck, listInputProduct);
router.get("/inputproduct/:id", authCheck, adminCheck, readInputProduct);
router.put("/inputproduct/:id", authCheck, adminCheck, updateInputProduct);
router.delete("/inputproduct/:id", authCheck, adminCheck, removeInputProduct);
router.post(
  "/searchinputproduct/filters",
  authCheck,
  adminCheck,
  searchfiltersInputproduct
);

module.exports = router;
