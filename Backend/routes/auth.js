const express = require("express");
const router = express.Router();
const { register,login,currentUser } = require('../controllers/CTauth')


router.post('/register',register)
router.post('/login',login)
router.post('/current-User',currentUser)
router.post('/current-Admin',currentUser)





module.exports = router