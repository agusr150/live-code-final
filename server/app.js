const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require ('cors')

const UserRouter = require('./routes/userRouter')
const CountryRouter = require('./routes/countryRouter')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get ('/', (req,res)=> res.send('ok'))

app.use ('/user', UserRouter)
app.use ('/', CountryRouter)

app.listen(port, ()=> console.log(`listening port ${port}`))