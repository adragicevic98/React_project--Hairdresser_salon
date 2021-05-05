const rezervacijeRouter = require('express').Router();
const Rezervacija = require('../models/rezervacija');
const Korisnik = require('../models/korisnik');
const jwt = require('jsonwebtoken');

rezervacijeRouter.get('/',async(req,res) => {
  const rezervacije=await Rezervacija.find({})
  .populate('korisnik',{username:1,ime:1,prezime:1,mob:1})
    res.json(rezervacije)
  
})
rezervacijeRouter.get('/:id',async(req,res) => {
  const r=await Rezervacija.findById(req.params.id)
  if(r){
    res.json(r)
  }else{
    res.status(404).end()
  }
})

rezervacijeRouter.delete('/:id',async(req,res) => {
  const id=req.params.id
  await Rezervacija.findByIdAndRemove(id)
  res.status(204).end()
})

rezervacijeRouter.put('/:id',async (req,res) =>{
  const id=req.params.id
  const data=req.body
  const rezervacija={
    datum:data.datum,
    pocetak:data.pocetak,
    kraj:data.kraj,
    tretman:data.tretman
  }
  await Rezervacija.findByIdAndUpdate(id,rezervacija,{new:true})
  res.json(rezervacija)
})
const dohvatiToken = req => {
  const auth =req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')){
    return auth.substring(7)
  }
  return null
}

rezervacijeRouter.post('/',async(req,res,next) => {
  const data=req.body
  const token = dohvatiToken(req)
  const dekToken = jwt.verify(token, process.env.SECRET)
  if (!token || !dekToken.id){
    return res.status(401).json({error: 'neispravni ili nepostojeći token'})
  }
  const korisnik=await Korisnik.findById(dekToken.id)
  if(!data.datum){
    return res.status(400).json({
      error:'Za rezervaciju je nužan datum!'
    })
  }
  if(!data.tretman){
    return res.status(400).json({
      error:'Nedostaje tretman!'
 })
 }
 if(!data.pocetak){
  return res.status(400).json({
    error:'Nedostaje vremenski pocetak tretmana!'
  })
}
if(!data.kraj){
  return res.status(400).json({
    error:'Nedostaje vremenski kraj tretmana!'
  })
}
const rezervacija=new Rezervacija({
  datum:data.datum,
  pocetak:data.pocetak,
  kraj:data.kraj,
  tretman:data.tretman,
  korisnik:korisnik._id
})

const rezervacijaSpremljena=await rezervacija.save()
korisnik.rezervacije=korisnik.rezervacije.concat(rezervacijaSpremljena._id)
await korisnik.save()
const rez={
  id:rezervacijaSpremljena._id,
  datum:rezervacija.datum,
  pocetak:rezervacija.pocetak,
  kraj:rezervacija.kraj,
  tretman:rezervacija.tretman,
  korisnik:korisnik
}
res.json(rez)
});



module.exports = rezervacijeRouter;