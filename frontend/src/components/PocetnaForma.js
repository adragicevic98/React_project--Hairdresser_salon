import React from 'react'	
 
const PocetnaForma = ({
  regLogin,
  prijava,
  promjenaPrijave,
  registracija,
  promjenaRegistracije
}) => (
  <form onSubmit={regLogin}>
      <button type="submit">Prijavi se</button>
      <button type="submit">Registriraj se</button>
  </form>
)
 
export default PocetnaForma