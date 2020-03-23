const express = require('express')
const router = express.Router()

const UserControl = require('../controllers/userControl')

router.post('/login', UserControl.login)


module.exports = router