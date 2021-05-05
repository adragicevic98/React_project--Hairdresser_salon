const bcrypt =require('bcrypt')
const korisniciRouter = require('express').Router();
const Korisnik = require('../models/korisnik'); //ucitavanje mongoose modela

korisniciRouter.get('/',async (req,res) => {
  const korisnici=await Korisnik.find({}) // ako su prazne zagrade {} dohvaca sve podatke koji odgovaraju tom modelu, mozemo tu stavit i neki uvjet npr {vazno:true}
  .populate('rezervacije',{datum:1,pocetak:1,kraj:1,tretman:1})
      res.json(korisnici)
  })
 korisniciRouter.get('/:id',async(req,res) => {
    const k=await Korisnik.findById(req.params.id)
    if(k){
      res.json(k)
    }else{
      res.status(404).end()
    }
  })
korisniciRouter.delete('/:id',async(req,res) => {
    const id=req.params.id
    await Korisnik.findByIdAndRemove(id)
    res.status(204).end()
  })
korisniciRouter.post('/', async(req,res)=>{
    const sadrzaj=req.body //{username:,pass:}
    const passHash=await bcrypt.hash(sadrzaj.pass, 10) 
    if(!sadrzaj.username){
      return res.status(400).json({
        error:'Username je obavezan!'
      })
    }
    if(!sadrzaj.pass){
      return res.status(400).json({
        error:'Nedostaje lozinka!'
   })
   }
    const korisnik= new Korisnik({
        username:sadrzaj.username,
        ime:sadrzaj.ime,
        prezime:sadrzaj.prezime,
        spol:sadrzaj.spol,
        passHash:passHash, //moze i samo passHash ako se isto zovu
        //kad se tek stvara korisnik on jos nema rezervacija, stvorit ce prazan niz
        mob:sadrzaj.mob
    })
    const noviKorisnik= await korisnik.save()
    res.json(noviKorisnik) //korisniku vracamo odg samo ako se podatak spremi u bazu
})
korisniciRouter.put('/:id',async (req,res) =>{
    const id=req.params.id
    const data=req.body
    const passHash=await bcrypt.hash(data.pass, 10) 
    if(!data.username){
      return res.status(400).json({
        error:'Username obavezan!'
      })
    }
    if(!data.pass){
      return res.status(400).json({
        error:'Nedostaje lozinka!'
   })
   }
    const korisnik={
      id:data.id,
      username:data.username,
      ime:data.ime,
      prezime:data.prezime,
      spol:data.spol,
      passHash:passHash,
      mob:data.mob
    }
    await Korisnik.findByIdAndUpdate(id,korisnik,{new:true})
    res.json(korisnik)
  })

module.exports=korisniciRouter