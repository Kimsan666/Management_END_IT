const express = require("express");
const router = express.Router();
const { listWarehouseStock,updateWarehouseStock,readWarehouseStock,removeWarehouseStock } = require('../controllers/CTwarehouseStock')

router.get('/warehousestocks',listWarehouseStock)
// router.get('/warehousestock/:id',readWarehouseStock)
// router.put('/warehousestock/:id',updateWarehouseStock)
router.delete('/warehousestock/:id',removeWarehouseStock)


module.exports = router