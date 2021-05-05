require('dotenv').config() //ucitavanje environment varijabli prilikom pokretanja da bi bile dostupne u objektu process.env u aplikaciji

const PORT=process.env.PORT || 5000

//Baza podataka
const password=process.env.ATLAS_PASS

const dbname=process.env.NODE_ENV ==='test' ? 'rezervacije-api-test' : 'rezervacije-api'
const DB_URI=`mongodb+srv://oarwa-ad:${password}@cluster0.xkrn6.mongodb.net/${dbname}?retryWrites=true&w=majority`

module.exports={PORT,DB_URI}