const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
 
const korisnikSchema=new mongoose.Schema({  //struktura dokumenta kojeg spremamo 
  username:{
    type:String,
    unique:true,
    minlength:3,
    required:true},
  ime:{
    type:String,
    minlength:3,
    required:true},
  prezime:{
    type:String,
    minlength:3,
    required:true},
  spol:String,
  passHash:{
    type:String,
    minlength:4,
    required:true},
  mob:{
    type:String,
    minlength:6,
    required:true},
  rezervacije:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Rezervacija'
  }]
})
korisnikSchema.plugin(uniqueValidator)
korisnikSchema.set('toJSON',{  
  transform:(doc,ret)=>{
    ret.id=ret._id.toString()
    delete ret._id
    delete ret.__v
    delete ret.passHash
    return ret
  }
})

const Korisnik=mongoose.model('Korisnik',korisnikSchema,'korisnici') 

module.exports = Korisnik;