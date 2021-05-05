const mongoose = require('mongoose');

const rezervacijaSchema=new mongoose.Schema({
  datum:{
    type:Date,
    required:true,
    minlength:4
  },
  pocetak:{
    type:Number,
    required:true,
    minlength:1
  },
  kraj:{
    type:Number,
    required:true,
    minlength:1
  },
  tretman:{
    type:String,
    required:true
  },
  korisnik:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Korisnik'
  }
 
})
rezervacijaSchema.set('toJSON',{
  transform:(doc,ret)=>{
    ret.id=doc.id.toString()
    delete ret._id
    delete ret.__v
    return ret
  }
})
module.exports=mongoose.model('Rezervacija',rezervacijaSchema,'rezervacije')
