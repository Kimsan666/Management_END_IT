const express = require("express");
const router = express.Router();
const { saveCategory,listCategory,updateCategory,removeCategory } = require('../controllers/CTcategory')


router.post('/category',saveCategory)
router.get('/category',listCategory)
router.put('/category/:id',updateCategory)
router.delete('/category/:id',removeCategory)





module.exports = router