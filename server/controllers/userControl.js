const {User} = require('../models/index')
const jwt = require ('jsonwebtoken')

class UserControl {
    static login(req, res){
        console.log(req.body)
        User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(data => {
            console.log(data)
            if(data){
                if(data.password !== req.body.password){
                    res.status(400).json('password wrong')
                } else {
                    let token = jwt.sign({id: data.id, username: data.username}, 'secret')
                    console.log("sukses")
                    res.status(200).json({
                        token: token,
                        id: data.id,
                        username: data.username
                    })
                }
            } else {
                res.status(400).json('username wrong')
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err.message)
        })
    }
}

module.exports = UserControl