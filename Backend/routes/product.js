const express = require("express");
const router = express.Router();
const { saveProduct,listsProduct,updateProduct,removeProduct,readProduct,searchfiltersProduct } = require('../controllers/CTproduct')

router.post('/product',saveProduct)
router.get('/products/:count',listsProduct)
router.put('/product/:id',updateProduct)
router.delete('/product/:id',removeProduct)
router.post('/productby',readProduct)
router.post('/search/filters',searchfiltersProduct)




module.exports = router