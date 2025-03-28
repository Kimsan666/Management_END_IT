const express = require("express");
const router = express.Router();
const { saveEmployee,listsEmployee,updateEmployee,readEmployee,removeEmployee,searchfiltersEmployee } = require('../controllers/CTemployee')

router.post('/employee',saveEmployee)
router.get('/employees/:count',listsEmployee)
router.put('/employee/:id',updateEmployee)
router.get('/employee/:id',readEmployee)
router.delete('/employee/:id',removeEmployee)
router.post('/searchemployee/filters',searchfiltersEmployee)


module.exports = router