import React from 'react'
import Dropdown from './Dropdown';	
import InputLabel from '@material-ui/core/InputLabel';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {TextField,Button} from '@material-ui/core'
const razmak={
    marginLeft:'10px'
}
const EditForma = ({
    userEdit,
    username,
    spol,
    options,
    promjenaLozinke,
    promjenaLozinke1,
    promjenaImena,
    promjenaPrezimena,
    promjenaMoba,
    promjenaSpola,
    promjenaEditVidljivosti
  }) => (
      <div className="formaDiv">
    <form onSubmit={userEdit} >
    <div>
    <TextField color="secondary" label="username"  disabled={true} value={username} name='Username'/> 
    </div>
    <div>
      <TextField color="secondary" label="name"  required={true}  name='Ime' onChange={promjenaImena} /> 
    </div>
    <div>
    <TextField color="secondary" label="surname" required={true}  name='Prezime'onChange={promjenaPrezimena} /> 
    </div> 
    <div>
     <TextField color="secondary" label="phone number" required={true}  onChange={promjenaMoba}  name="Mob"/>  
    </div>
    <div>
     <TextField color="secondary" label="password" type='password' required={true}  name='Pass' onChange={promjenaLozinke} /> 
    </div>
    <div>
     <TextField color="secondary" label="repeat password" type='password' required={true}  name='Pass1' onChange={promjenaLozinke1} /> 
    </div>
    <div><br></br>
    <InputLabel id="demo-simple-select-label"> Sex:
       <Dropdown options={options}  value={spol} name='Spol'  onChange={promjenaSpola}/></InputLabel><br></br>
    </div>
    <Button variant="contained" color="secondary" startIcon={<AddBoxIcon />} type='submit'>Save</Button><Button style={razmak} variant="contained" color="secondary" value='false' onClick={promjenaEditVidljivosti}>Close</Button>
  </form>
  </div>
  
  )
  
   
  export default EditForma