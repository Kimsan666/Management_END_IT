const express = require("express");
const router = express.Router();
const {authCheck,adminCheck} = require('../middlewares/authCheck')
const { saveProduct,listsProduct,updateProduct,removeProduct,readProduct,listbyProduct,searchfiltersProduct,UploadImages,RemoveImage } = require('../controllers/CTproduct')

router.post('/product',authCheck,adminCheck,saveProduct)
router.get('/products/:count',listsProduct)
router.put('/product/:id',authCheck,adminCheck,updateProduct)
router.get('/product/:id',authCheck,adminCheck,readProduct)
router.delete('/product/:id',authCheck,adminCheck,removeProduct)
router.post('/productby', authCheck,adminCheck,listbyProduct)
router.post('/search/filters',searchfiltersProduct)

router.post('/images',authCheck,adminCheck,UploadImages)
router.post('/removeimage',authCheck,adminCheck,RemoveImage)




module.exports = router