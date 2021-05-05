import React, {useState} from 'react'
const Tretman = (props) => {

    const [addrtype, setAddrtype] = useState(["haircut", "coloring", "highlights","styling","festive hairstyle","balayage","ombre","afro hair style"])
    const Add = addrtype.map(Add => Add
    )
    const handleAddrTypeChange = (e) => props.funkcija((addrtype[e.target.value]))
    
    return (
      <select
        onChange={e => handleAddrTypeChange(e)}
        className="browser-default custom-select" >
        {
          Add.map((address, key) => <option value={key} key={key}>{address}</option>)
        }
      </select >)
  
  }
  export default Tretman