const bcrypt=require('bcrypt')
const Korisnik=require('../models/korisnik') 
const pomocni=require('./test_pomocni')
const mongoose=require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const api=supertest(app)

describe('Samo jedan korisnik u bazi',()=>{
beforeEach(async() =>{
    await Korisnik.deleteMany({})
    const passHash=await bcrypt.hash('tajna',10)
    const korisnik=new Korisnik({
        username:'admin',
        ime:'Administartor',
        prezime:'Dragicevic',
        spol:'Z',
        passHash,
        mob:'0912223333'
    })
    await korisnik.save()
})
test('ispravno vraca gresku ako postoji username', async () =>{
    const novi={
        username:'admin',
        ime:'Antonela',
        prezime:'Dragicevic',
        spol:'Z',
        mob:'091 123 1233',
        pass:'oarwa'
    }
    const pocetniKor=await pomocni.korisniciIzBaze()
    const rez=await api.post('/api/korisnici')
    .send(novi)
    .expect(400)
    .expect('Content-Type', /application\/json/)

   expect(rez.body.error).toContain('Krivi ID format')
    const krajKorisnici=await pomocni.korisniciIzBaze()
    expect(krajKorisnici).toHaveLength(pocetniKor.length)
    
})

test('stvaranje novog korisnika',async()=>{
    const novi={
        username:'mlaca',
        ime:'Matea',
        prezime:'Laca',
        spol:'Z',
        mob:'091 123 1233',
        pass:'oarwa'
    }
    const pocetniKor=await pomocni.korisniciIzBaze()
    await api.post('/api/korisnici')
    .send(novi)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const krajKorisnici=await pomocni.korisniciIzBaze()
    expect(krajKorisnici).toHaveLength(pocetniKor.length+1)
    const svaImena=krajKorisnici.map(k=>k.username)
    expect(svaImena).toContain(novi.username)

}) 

afterAll(async () =>{
    await mongoose.connection.close()
})
})