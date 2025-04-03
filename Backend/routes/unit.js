const express = require("express");
const router = express.Router();
const {authCheck,adminCheck} = require('../middlewares/authCheck')
const { saveUnit,listUnit,removeUnit,readUnit, updateUnit } = require('../controllers/CTunit')


router.post('/unit',authCheck,adminCheck,saveUnit)
router.get('/unit',listUnit)
router.get('/unit/:id',authCheck,adminCheck,readUnit)
router.put('/unit/:id',authCheck,adminCheck,updateUnit)
router.delete('/unit/:id',authCheck,adminCheck,removeUnit)

module.exports = router