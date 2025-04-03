const express = require("express");
const router = express.Router();
const {saveSupplier,listSupplier,updateSupplier,readSupplier,removeSupplier} = require('../controllers/CTsuppllier')
const {authCheck,adminCheck} = require('../middlewares/authCheck')

router.post('/supplier',authCheck,adminCheck,saveSupplier)
router.get('/suppliers',listSupplier)
router.get('/supplier/:id',authCheck,adminCheck,readSupplier)
router.put('/supplier/:id',authCheck,adminCheck,updateSupplier)
router.delete('/supplier/:id',authCheck,adminCheck,removeSupplier)





module.exports = router