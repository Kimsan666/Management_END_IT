const express = require("express");
const router = express.Router();
const {saveSupplier,listSupplier,updateSupplier,readSupplier,removeSupplier} = require('../controllers/CTsuppllier')

router.post('/supplier',saveSupplier)
router.get('/suppliers',listSupplier)
router.get('/supplier/:id',readSupplier)
router.put('/supplier/:id',updateSupplier)
router.delete('/supplier/:id',removeSupplier)





module.exports = router