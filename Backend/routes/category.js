const express = require("express");
const router = express.Router();
const { saveCategory,listCategory,removeCategory } = require('../controllers/CTcategory')


router.post('/category',saveCategory)
router.get('/category',listCategory)
router.delete('/category/:id',removeCategory)





module.exports = router