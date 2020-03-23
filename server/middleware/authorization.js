const {Report} = require('../models/index')

function authorization (req, res, next) {
    console.log(req.params.id)
    Report.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(data=>{
        if(data.UserId === req.userdata.id)
        next()
        else {
            res.status(400).json('not authorized')
        }
    })
}

module.exports = authorization