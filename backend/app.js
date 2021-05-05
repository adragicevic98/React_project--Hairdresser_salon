const config=require('./utils/config')
const express=require('express')
require('express-async-errors')
const app=express()
const cors=require('cors')
const korisniciRouter=require('./controllers/korisnici')
const rezervacijeRouter=require('./controllers/rezervacije')
const middleware=require('./utils/middleware')
const logger=require('./utils/logger')
const mongoose=require('mongoose')
const loginRouter = require('./controllers/login')

logger.info('Spajam se na',config.DB_URI)
mongoose.connect(config.DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(result => {
    console.log("Spojeni smo na bazu");
}).catch(error => {
    console.log("Greška pri spajajnju", error.message);
})

app.use(cors())
app.use(express.json())

app.use('/api/login',loginRouter)
app.use(middleware.zahtjevInfo) //middleware

app.use('/api/korisnici',korisniciRouter)
app.use('/api/rezervacije',rezervacijeRouter)

app.use(middleware.nepoznataRuta)
app.use(middleware.errorHandler)

module.exports=app