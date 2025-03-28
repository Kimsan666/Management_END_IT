const express = require("express");
const router = express.Router();
const { saveUnit,listUnit,removeUnit,readUnit, updateUnit } = require('../controllers/CTunit')


router.post('/unit',saveUnit)
router.get('/unit',listUnit)
router.get('/unit/:id',readUnit)
router.put('/unit/:id',updateUnit)
router.delete('/unit/:id',removeUnit)

module.exports = router