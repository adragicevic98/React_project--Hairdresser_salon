import React from 'react'	
import Dropdown from './Dropdown';
import {TextField,Button} from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';

const forma={
  textAlign:'center'
}

const RegistracijaForma = ({
    userRegistration,
    promjenaKorImena,
    promjenaLozinke,
    promjenaLozinke1,
    promjenaImena,
    promjenaPrezimena,
    promjenaSpola,
    promjenaMoba,
    username,
    pass,
    pass1,
    ime,
    prezime,
    spol,
    mob,options
  }) => (
    <form onSubmit={userRegistration} style={forma}>
    <div>
      <TextField color="secondary" label="username" value={username} name='Username'onChange={promjenaKorImena}/>
    </div>
    <div>
      <TextField color="secondary" label="name" type='text' value={ime} name='Ime' onChange={ promjenaImena} />
    </div>
    <div>
    <TextField color="secondary" label="surname" type='text' value={prezime} name='Prezime' onChange={ promjenaPrezimena} />
    </div>
   
    <div>
      <TextField color="secondary" label="phone number" type='text' value={mob} name='Mob' onChange={ promjenaMoba} />
    </div>
    <div>
    <TextField color="secondary" label="password" type='password' value={pass} name='Pass'onChange={ promjenaLozinke} />
    </div>
    <div>
    <TextField color="secondary" label="repeated password" type='password' value={pass1} name='Pass1'onChange={ promjenaLozinke1} />
    </div>
    <div>
        <br></br>
        <InputLabel id="demo-simple-select-label"> sex :
      <Dropdown options={options} value={spol} onChange={promjenaSpola}/></InputLabel><br></br>
    </div><br></br>
    <Button variant="contained" color="secondary" type="submit"> Sign Up</Button>
  </form>
  )
  
   
  export default RegistracijaForma