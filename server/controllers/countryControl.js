const {Country} = require('../models/index')
const {Report} = require('../models/index')

class CountryControl{
    static show(req, res){
        console.log('show')
        Country.findAll()
        .then(data=> {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    }

    static showMy(req,res){
        console.log('showMy')
        console.log(req.userdata)
        Report.findOne({
            where: {
                UserId: req.userdata.id
            }
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json(err)
        })  
    }

    static create(req,res){
        let newData = {
            report : req.body.cases,
            UserId : req.userdata.id,
            CountryId : req.body.CountryId
        }
        Report.create(newData)
        .then(data1=>{
            console.log("data1")
            Country.findOne({
                where: {
                    id: req.body.CountryId
                }
            })
            .then(data2=>{
                console.log("ini data2")
                console.log(data2.rows)
                let newcase = data2.cases + req.body.report
                Country.update({
                    cases : newcase
                }, {
                    where: {
                        id: req.body.CountryId
                    }
                })
                .then(result =>{
                    console.log(result)
                    res.status(200).json(data1)
                })
            })
                
            
        })
    }
}

module.exports = CountryControl