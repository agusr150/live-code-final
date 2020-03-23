const express = require('express')
const router = express.Router()

const CountryControl = require('../controllers/countryControl')
const authentication = require('../middleware/authentication')


router.get('/countries', authentication, CountryControl.show)
router.get('/reports', authentication, CountryControl.showMy)
router.post('/reports', authentication, CountryControl.create)

module.exports = router