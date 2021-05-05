const Rezervacija = require('../models/rezervacija')
const Korisnik = require('../models/korisnik')

const pocetneRezervacije=[
    {
        id:1,
        datum:'2020-12-30',
        pocetak:"10",
        kraj:"11",
        tretman:"peglanje"
    },
    {
        id:2,
        datum:'2020-12-31',
        pocetak:"11",
        kraj:"12",
        tretman:"šišanje i bojanje"
    },
    {
        id:3,
        datum:'2020-12-31',
        pocetak:"13",
        kraj:"14",
        tretman:"feniranje"
    },
]
const rezervacijeIzBaze=async()=>{
    const rezervacije=await Rezervacija.find({})
    return rezervacije.map(r=>r.toJSON())
}
const korisniciIzBaze=async()=>{
    const korisnici=await Korisnik.find({})
    return korisnici.map(k=>k.toJSON())
}
// const nepostojeciId=async()=>{
//     const rezervacija=new Rezervacija({datum:'2020-03-31',pocetak:'11',kraj:'12',tretman:"feniranje"})
//     await rezervacija.save()
//     await rezervacija.remove()

//     return rezervacija._id.toString()
// }
module.exports={
    pocetneRezervacije,rezervacijeIzBaze,korisniciIzBaze
}