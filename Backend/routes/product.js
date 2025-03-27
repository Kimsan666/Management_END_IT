const express = require("express");
const router = express.Router();
const { saveProduct,listsProduct,updateProduct,removeProduct,readProduct,listbyProduct,searchfiltersProduct } = require('../controllers/CTproduct')

router.post('/product',saveProduct)
router.get('/products/:count',listsProduct)
router.put('/product/:id',updateProduct)
router.get('/product/:id',readProduct)
router.delete('/product/:id',removeProduct)
router.post('/productby', listbyProduct)
router.post('/search/filters',searchfiltersProduct)




module.exports = router