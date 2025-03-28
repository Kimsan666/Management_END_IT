const express = require("express");
const router = express.Router();
const { saveCategory,listCategory,updateCategory,readCategory,removeCategory } = require('../controllers/CTcategory')


router.post('/category',saveCategory)
router.get('/categorys',listCategory)
router.put('/category/:id',updateCategory)
router.get('/category/:id',readCategory)
router.delete('/category/:id',removeCategory)





module.exports = router