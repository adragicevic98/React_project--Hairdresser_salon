import axios from 'axios'
const osnovniUrl = 'http://localhost:5000/api/rezervacije'
let token = null
const postaviToken = noviToken => {
    token = `bearer ${noviToken}`
}
 
const dohvatiSve = () => {
    return axios.get(osnovniUrl);
}
const stvori = async noviObjekt => {
    const config={
        headers: {Authorization: token}
    }
    const odgovor=await axios.post(osnovniUrl,noviObjekt,config)
    return odgovor
}
 
const osvjezi = (id, noviObjekt) => {
    return axios.put(`${osnovniUrl}/${id}`, noviObjekt)
}
const brisi=id=>{
    return axios.delete(`${osnovniUrl}/${id}`)
}
 
export default {
    dohvatiSve: dohvatiSve,
    stvori: stvori,
    osvjezi: osvjezi,
    brisi:brisi,
    postaviToken:postaviToken
}