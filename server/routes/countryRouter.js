const express = require('express')
const router = express.Router()

const CountryControl = require('../controllers/countryControl')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')


router.get('/countries', authentication, CountryControl.show)
router.get('/reports', authentication, CountryControl.showMy)
router.post('/reports', authentication, CountryControl.create)
router.delete('/reports/:id', authentication, authorization, CountryControl.delete)

module.exports = router