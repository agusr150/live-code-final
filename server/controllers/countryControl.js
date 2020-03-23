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
                console.log(data2.dataValues)
                console.log("------")
                console.log(data2.dataValues.cases)
                let newcase = Number(data2.dataValues.cases) + Number(req.body.cases)
                console.log(newcase+"<<newcase")
                Country.update({cases : newcase}, {
                    where: {
                        id: req.body.CountryId
                    }
                })
                .then(result =>{
                    console.log(result)
                    res.status(200).json({
                        "id": data1.id,
                        "report": data1.report,
                        "UserId": data1.UserId,
                        "CountryId": data1.CountryId,
                        "createdAt": data1.createdAt,
                        "updatedAt": data1.updatedAt,
                        "Country": data2
                    }
                        )
                })
            })   
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

    static delete(req, res){
        let searchId =  req.params.id
        Report.findOne({
            where: {
                id: searchId
            }
        })
        .then(data1=>{
            console.log('---data1')
            console.log(data1)
            let countryId = data1.dataValues.CountryId
            Country.findOne({
                where: {
                    id: countryId
                }
            })
            .then(data2=>{
                console.log('----data2')
                console.log(data2)
                let newcases =  Number(data2.dataValues.cases)-Number(data1.dataValues.report)
                console.log(newcases+"<<delcase")
                Country.update({cases: newcases},{
                    where: {
                        id: countryId
                    }
                })
                .then(data3=>{
                    console.log(data3)
                    Country.findOne({
                        where: {
                            id: countryId
                        }
                    })
                    .then(data4=>{
                        Report.destroy({
                            where: {id: searchId}
                        })
                        .then(result=>{
                            res.status(200).json({
                                "country": {
                                    "id": data4.dataValues.id,
                                    "name": data4.dataValues.name,
                                    "deaths": data4.dataValues.deaths,
                                    "recovered": data4.dataValues.recovered,
                                    "cases": data4.dataValues.cases,
                                    "createdAt": data4.dataValues.createdAt,
                                    "updatedAt": data4.dataValues.updatedAt
                                },
                                "report": "Successfully delete"})
                        })
                    })    
                })
            })
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }
}

module.exports = CountryControl