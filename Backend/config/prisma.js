
require("dotenv").config(); // โหลดค่าจาก .env
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()




module.exports = prisma