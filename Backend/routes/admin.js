const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/authCheck");
const { changeOrderStatus,listOrderAdmi } = require("../controllers/CTadmin");

router.post('/admin/order-status',authCheck, adminCheck,changeOrderStatus);
router.get('/admin/orders',authCheck, adminCheck,listOrderAdmi)






module.exports = router