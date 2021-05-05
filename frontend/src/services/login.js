import axios from 'axios'
const osnovniUrl = 'http://localhost:5000/api/login'
 
const prijava = async podaci => {
  const odgovor = await axios.post(osnovniUrl, podaci)
  return odgovor.data
}
 
export default {prijava}