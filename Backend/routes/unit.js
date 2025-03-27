const express = require("express");
const router = express.Router();
const { saveUnit,listUnit,removeUnit, updateUnit } = require('../controllers/CTunit')


router.post('/unit',saveUnit)
router.get('/unit',listUnit)
router.put('/unit/:id',updateUnit)
router.delete('/unit/:id',removeUnit)

module.exports = router