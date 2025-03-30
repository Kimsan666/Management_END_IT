const express = require("express");
const router = express.Router();
const { saveInputProduct,listInputProduct,updateInputProduct,readInputProduct,removeInputProduct } = require('../controllers/CTinputproduct')

router.post('/inputproduct',saveInputProduct)
router.get('/inputproducts',listInputProduct)
router.get('/inputproduct/:id',readInputProduct)
router.put('/inputproduct/:id',updateInputProduct)
router.delete('/inputproduct/:id',removeInputProduct)

module.exports = router