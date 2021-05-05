import React from 'react'	
const stil={
   color:'#e6005c',
   fontStyle:'oblique',
   fontWeight:'bold',
   fontFamily:'Papyrus'
}
const ProfilForma = ({
    username,
    pass,
    ime,
    prezime,
    spol,
    mob
  }) => (
    <form >
    <div>
      <label style={stil}>Username: </label>&nbsp;{username}
    </div>
    <div>
    <label style={stil}>Name: </label>&nbsp;{ime}
    </div>
    <div>
    <label style={stil}>Surname: </label>&nbsp;{prezime}
    </div>
    <div>
    <label style={stil}>Sex: </label>&nbsp;{spol}
    </div> 
    <div>
    <label style={stil}>Phone number: </label>&nbsp;{mob}
    </div>
    <div>
    </div>
  </form>
  )
  
   
  export default ProfilForma