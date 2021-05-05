const mongoose = require('mongoose')
const supertest = require('supertest')
const pomocni=require('./test_pomocni')
const app = require('../app')
const Rezervacija=require('../models/rezervacija')
const jwt=require('jsonwebtoken')
 
const api = supertest(app)

const pocetneRezervacije=[
    {
        id:1,
        datum:'2020-12-30',
        pocetak:'10',
        kraj:'11',
        tretman:"peglanje"
    },
    {
        id:2,
        datum:'2020-12-31',
        pocetak:'11',
        kraj:'12',
        tretman:"šišanje i bojanje"
    },
    {
        id:3,
        datum:'2020-12-31',
        pocetak:'13',
        kraj:'14',
        tretman:"feniranje"
    },
]
beforeEach( async () => {
    await Rezervacija.deleteMany({})
    let objektRezervacija = new Rezervacija(pocetneRezervacije[0])
    await objektRezervacija.save()
    objektRezervacija = new Rezervacija(pocetneRezervacije[1])
    await objektRezervacija.save()
    objektRezervacija = new Rezervacija(pocetneRezervacije[2])
    await objektRezervacija.save()
  })
test('Rezervacije se vraćaju kao JSON', async () => {
  await api
    .get('/api/rezervacije')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('Dodavanje rezervacije bez sadrzaja',async()=>{
  const userToken = {
    username : "admin",
    id:"602257edb1e64d8d50cbecd4"
  }
  const token = jwt.sign(userToken, process.env.SECRET)
  const novaRez={
  pocetak:'9',
  kraj:'10',
  tretman:'bojanje'}

  await api.post('/api/rezervacije')
    .set('Authorization', `Bearer ${token}`)
    .send(novaRez)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  const odgovor=await api.get('/api/rezervacije')
  expect(odgovor.body).toHaveLength(pocetneRezervacije.length)
})
test('Ispravno brisanje rezervacije', async () => {
  const rezervacijePocetak = await pomocni.rezervacijeIzBaze()
  const rezervacijaZaBrisanje = rezervacijePocetak[0]

  const odgovor = await api
    .delete(`/api/rezervacije/${rezervacijaZaBrisanje.id}`)
    .expect(204)

  const rezervacijeKraj = await pomocni.rezervacijeIzBaze()
  expect(rezervacijeKraj).toHaveLength(rezervacijePocetak.length - 1)

  const tretman= rezervacijeKraj.map(p => p.tretman)
  expect(tretman).not.toContain(rezervacijaZaBrisanje.tretman)

})

test('Dodavanje nove ispravne rezervacije',async()=>{

  const userToken = {
    username : "admin",
    id:"602add00f5ff9734209095e5"
  }
  const token = jwt.sign(userToken, process.env.SECRET)
    const novi={
        datum:'2021-01-04',
        pocetak:'9',
        kraj:'10',
        tretman:'bojanje'
    }
    const pocetnaRez=await pomocni.rezervacijeIzBaze()
    await api.post('/api/rezervacije')
    .set('Authorization', `Bearer ${token}`)
    .send(novi)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
    const krajRezervacije=await pomocni.rezervacijeIzBaze()
    const sviTretmani=krajRezervacije.map(r=>r.tretman)
    expect(sviTretmani).toContain(novi.tretman)
    expect(krajRezervacije).toHaveLength(pocetnaRez.length+1)
  
  }) 
test('u bazi su 3 rezervacije', async () => {
    const odgovor = await api.get('/api/rezervacije')
   
    expect(odgovor.body).toHaveLength(pocetneRezervacije.length)
  })
test('Provjera tretmana rezervacije', async () => {
    const odgovor = await api.get('/api/rezervacije')
    const tretman=odgovor.body.map(r=>r.tretman)
    expect(tretman).toContain('peglanje')
  })
test('Dohvat specificne rezervacije', async () => {
    const pocetneRez = await pomocni.rezervacijeIzBaze()
    const trazenaRez = pocetneRez[0]
  
    const odgovor = await api
    .get(`/api/rezervacije/${trazenaRez.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
    const jsonRez = JSON.parse(JSON.stringify(trazenaRez))
    expect(odgovor.body).toEqual(jsonRez)
  })
afterAll(() => {
  mongoose.connection.close()
})