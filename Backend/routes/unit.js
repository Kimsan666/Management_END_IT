const express = require("express");
const router = express.Router();
const { saveUnit,listUnit,removeUnit } = require('../controllers/CTunit')


router.post('/unit',saveUnit)
router.get('/unit',listUnit)
router.delete('/unit/:id',removeUnit)

module.exports = router