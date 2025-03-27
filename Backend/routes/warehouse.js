const express = require("express")
const router = express.Router();
const {saveWarehouse,listWarehouse,updateWarehouse,removeWarehouse} = require('../controllers/CTwarehouse')

router.post('/warehouse',saveWarehouse)
router.get('/warehouses',listWarehouse)
router.put('/warehouse/:id',updateWarehouse)
router.delete('/warehouse/:id',removeWarehouse)


module.exports = router