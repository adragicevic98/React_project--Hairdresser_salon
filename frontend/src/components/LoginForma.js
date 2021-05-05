	
import React from 'react'	
import {TextField,Button} from '@material-ui/core'
const loginF={
  textAlign:'center'
}

const LoginForma = ({
  userLogin,
  promjenaImena,
  promjenaLozinke,
  username,
  pass
}) => (
  <form onSubmit={userLogin} style={loginF}>
        <div>
          <TextField color="secondary" label="username" value={username} name='Username'onChange={promjenaImena}/>
        </div>
        <div>
          <TextField color="secondary" label="password" type='password' value={pass} name='Pass' onChange={promjenaLozinke} />
        </div>
        <br></br>
        <div>
          <Button variant="contained" color="secondary" type="submit">
            Sign In
          </Button>
        </div>
      </form> 

)
 
export default LoginForma