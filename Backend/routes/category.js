const express = require("express");
const router = express.Router();
const {authCheck,adminCheck} = require('../middlewares/authCheck')
const { saveCategory,listCategory,updateCategory,readCategory,removeCategory } = require('../controllers/CTcategory')


router.post('/category',authCheck,adminCheck,saveCategory)
router.get('/categorys',listCategory)
router.put('/category/:id',authCheck,adminCheck,updateCategory)
router.get('/category/:id',authCheck,adminCheck,readCategory)
router.delete('/category/:id',authCheck,adminCheck,removeCategory)





module.exports = router