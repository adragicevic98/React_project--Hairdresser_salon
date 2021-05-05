import React,{useState,useEffect} from 'react';
import Rezervacija from './components/Rezervacija'
import RezervacijaKor from './components/RezervacijaKor'
import DateCalendar from './components/DateCalendar'
import Dropdown from './components/Dropdown';
import moment from 'moment'
import Tretman from './components/Tretman'
import rezervacijeServer from './services/rezervacije'
import korisniciServer from './services/korisnici'
import prijavaMetode from './services/login'
import LoginForma from './components/LoginForma'
import RegistracijaForma from './components/RegistracijaForma'
import ProfilForma from './components/ProfilForma'
import EditForma from './components/EditForma'
import AddBoxIcon from '@material-ui/icons/AddBox';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Alert } from '@material-ui/lab'
import './App.css'
import {Container,Button} from '@material-ui/core'


const App = (props) => {
    const [rezervacije,postaviRezervacije]=useState([])
    const [korisnici,postaviKorisnike]=useState([])
    const [odabirDatuma,postaviDatum]=useState(new Date())
    const [odabirPocetka,postaviPocetak]=useState('');
    const [odabirKraja,postaviKraj]=useState('');
    const [odabirTretmana,postaviTretman]=useState('haircut');
    const [username, postaviUsername] = useState('')
    const [pass, postaviPass] = useState('')
    const [pass1,postaviPass1]=useState('')
    const [korisnik, postaviKorisnika] = useState(null)
    const [loginVidljiv, postaviLoginVidljivost] = useState(false)
    const [registracijaVidljiva,postaviRegistracijaVidljivost]=useState(false)
    const [pocetnaVidljiva,postaviPocetnaVidljivost]=useState(true)
    const [editVidljiv,postaviEditVidljivost]=useState(false)
    const [ime, postaviIme] = useState('')
    const [prezime, postaviPrezime] = useState('')
    const [spol, postaviSpol] = useState('M')
    const [mob, postaviMob] = useState('')
    const [profilVidljiv,postaviProfilVidljiv]=useState(false)
    const [info, postaviInfo] = useState(null)
 

    const today=new Date();
    const yesterday=new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    //console.log(Date.parse(today))
    const userLogin = async (e) => {
      e.preventDefault()
      try{
        const korisnik = await prijavaMetode.prijava({
          username, pass
        })
        window.localStorage.setItem('prijavljeniKorisnik', JSON.stringify(korisnik))
        rezervacijeServer.postaviToken(korisnik.token)
        postaviKorisnika(korisnik)
        postaviInfo(`Welcome ${korisnik.ime}`)
        setTimeout(()=>{
          postaviInfo(null)
        },5000)
        postaviUsername('')
        postaviPass('')
        postaviIme('')
        postaviPrezime('')
        postaviMob('')
      } catch (exception){
        alert('Invalid data! Try again!')
      }
    }
    const userEdit = async(e)=>{
      e.preventDefault()
      if(pass==pass1){
        const noviObjekt={
          ...korisnik,
          id:korisnik.id,
          ime:ime,
          prezime:prezime,
          spol:spol,
          mob:mob,
          pass:pass
        }  	
      //console.log("ID:"+korisnik.id);
      korisniciServer.osvjezi(korisnik.id,noviObjekt)
      .then(response => {
        postaviKorisnike(korisnici.map(k => k.id !== korisnik.id ? k : response.data))
        postaviKorisnika(response.data);
        rezervacijeServer
        .dohvatiSve()    
        .then(response => {
          postaviRezervacije(response.data)
        })//  alert("Successfully modified!");
          postaviEditVidljivost(false)
      }).catch(err=>{
      
        if(err.message=== 'Request failed with status code 400')
        {
          alert("Exisiting username, please take another one!"); 
        }
       
      });}else{
        alert("Passwords don't match!")
      }
}
    
    const userRegistration=(e)=>{
      e.preventDefault()
     if(pass==pass1){
      const noviObjekt={
        username:username,
        ime:ime,
        prezime:prezime,
        spol:spol,
        mob:mob,
        pass:pass
      }  
    korisniciServer
    .stvori(noviObjekt)
    .then(response => {
      postaviKorisnike(korisnici.concat(response.data))
        postaviPocetnaVidljivost(false)
        postaviRegistracijaVidljivost(false)
        postaviLoginVidljivost(true)
        postaviUsername('')
        postaviPass('')
        postaviIme('')
        postaviPrezime('')
        postaviMob('')
    }) 
    .catch(err=>{
      postaviRegistracijaVidljivost(true)
      postaviPocetnaVidljivost(false)
      postaviLoginVidljivost(false)
      if(err.message=== 'Request failed with status code 400')
      {
       alert("Invalid data"); 
       postaviRegistracijaVidljivost(true)
       postaviPocetnaVidljivost(false)
       postaviLoginVidljivost(false)
       postaviUsername('')
       postaviPass('')
       postaviPass1('')
       postaviIme('')
       postaviPrezime('')
       postaviMob('')
      }
    });
     }else{
       alert("Passwords don't match!")
     }
    }
    useEffect( () => {
      const logiraniKorisnikJSON = window.localStorage.getItem('prijavljeniKorisnik')
      if (logiraniKorisnikJSON) {
        const korisnik = JSON.parse(logiraniKorisnikJSON)
        postaviKorisnika(korisnik)
        rezervacijeServer.postaviToken(korisnik.token)
      }
    }, [])
   
    const rezervacijeZaIspis= korisnik!=null
    ?rezervacije.filter(rezervacija=> rezervacija.korisnik===korisnik.id || rezervacija.korisnik.username==korisnik.username && Date.parse(rezervacija.datum)>=Date.parse(yesterday)) 
    :rezervacije.filter(rezervacija=>rezervacija.datum>=yesterday.getDate())

  useEffect(() => {
    rezervacijeServer
    .dohvatiSve()    
    .then(response => {
      postaviRezervacije(response.data)
    })
  }, [])
    console.log("Renederirano", rezervacije.length, 'rezervacija');
  
    const novaRezervacija=(e)=>{
      e.preventDefault()

      const noviObjekt={
        datum:odabirDatuma,
        pocetak:odabirPocetka,
        kraj:odabirKraja,
        tretman:odabirTretmana
      }  	
      
    rezervacijeServer
    .stvori(noviObjekt)
    .then(response => {
      postaviRezervacije(rezervacije.concat(response.data));
      //console.log("Odg servera:",response.data);
     //alert("Reservation successfully scheduled!")
    
     postaviPocetak('');
    }).catch(err=>{
      if(err.message=== 'Request failed with status code 400')
      {
        alert("Time must be chosen!"); 
      }
    });}
  const brisiRezervaciju =(id)=>{
    rezervacijeServer
    .brisi(id)
    .then(response=>{
      postaviRezervacije(rezervacije.filter(r=>r.id !==id))
    })
  }
  const promjenaTretmana = (e) => {
      postaviTretman(e.target.value)
    }
  const promjenaPocetka=(e)=>{
       if(optionsTermin.length>0){
        postaviKraj(parseInt(e.target.value)+1)
        postaviPocetak(parseInt(e.target.value));}
      else{
       postaviPocetak(null);
      }
    }
    
  const promjenaDatuma = (e) =>{
    postaviDatum(e.target.value)
  }
    var optionsTermin=[
      {key:'25',text:"Choose time!"},
      {key:'7',text:'07:00-08:00'},
      {key:'8',text:'08:00-09:00'},
      {key:'9',text:'09:00-10:00'},
      {key:'10',text:'10:00-11:00'},
      {key:'11',text:'11:00-12:00'}
     ]
    {if(korisnik!=null){
      for (let index = 0; index < rezervacije.length; index++) {
        const element = rezervacije[index];
        if(Date.parse(element.datum)==odabirDatuma){
          for (let i = 0; i <optionsTermin.length; i++) {
            if(parseInt(element.pocetak)==parseInt(optionsTermin[i].key)){
              optionsTermin=optionsTermin.filter(ot=>parseInt(ot.key)!=element.pocetak)
              //console.log("termini"+optionsTermin);
            }
          }
      
        }
        //console.log(element.datum);
        
      }
      var sat=0;
      if(moment(odabirDatuma).format("YYYY-MM-DD")==moment(today).format("YYYY-MM-DD")){
        if(parseInt(moment(odabirDatuma).format('mm'))>0){sat=parseInt(today.toString().slice(16,18))+1;}
        optionsTermin=optionsTermin.filter(ot=>parseInt(ot.key)>=sat)
       // console.log("Termin duzina:"+optionsTermin.length);
      }
    }}
   
  
    const odabraniDat = (d) => {
      postaviDatum(Date.parse(d));
      //console.log("Datum",d);
    }
    const odabraniTretman = (tr) => {
      postaviTretman(tr);
      //console.log("Tretman",tr);
    }
    const naslov1={
      color:'black',
      fontStyle: 'oblique',
      textAlign:'center',     
    }
    const naslov2={
      color:'#e6005c',
      textAlign:'center',
      fontWeight:'700',
      fontSize:'60px',
      fontFamily: "Brush Script MT"
    }
    const naslov3={
      color:'#e6005c',
      textAlign:'center',
      fontWeight:'500',
      fontSize:'50px',
      fontFamily: "Brush Script MT"
    }
    const glavni={
      textAlign:'center',
    }
    const naslov={
      color:'#e6005c',
      fontStyle: 'oblique',
      textAlign:'center'
    }
    const odjavaStil={
      marginRight:30,
      float:'right'
    }
    const container={
      display:'flex',
      flexWrap:'wrap',
      justifyContent:'space-evenly'
    }
  
    const h3naslovi={
     color:'black',
     fontStyle:'bold',
     fontFamily:'Papyrus',
     fontWeight:'500'
    }
    const div1={
      backgroundColor:'#ffe6ee',
      padding:'20px',
      margin:'10px'
    }
    const btnProfile={
      marginLeft:'20px'
    }
    const div2={
      padding:'20px',
      margin:'10px'
    }
    const sredina={
      backgroundColor:'#ffe6ee',
      padding:'20px',
      margin:'10px',
     textAlign:'center'
    }
    const divProfil={
      display:'flex',
      flexWrap:'wrap',
      justifyContent:'space-around',

    }
    const natrag={
      marginLeft:'30px'
    }
    const pocetnaForma=()=>{
      const sakrij = { display: pocetnaVidljiva ? 'none' : '' }
      const prikazi = { display: pocetnaVidljiva? '' : 'none'}
      return (
        <Container style={glavni}>
      <div style={prikazi}>
        <h2 style={naslov1}>Hairdresser salon - online booking</h2>
        <h1 style={naslov2}>"Beauty"</h1><br></br>
        <p>Have an account?</p>
      <Button variant="contained" color="secondary" onClick={() => {postaviLoginVidljivost(true); postaviRegistracijaVidljivost(false);postaviPocetnaVidljivost(false);}}>Sign In</Button>
      <p>Don't have an account? Join us!</p>
     <Button variant="contained" color="secondary" onClick={() => {postaviRegistracijaVidljivost(true); postaviLoginVidljivost(false);postaviPocetnaVidljivost(false);}}>Sign Up</Button>  <br></br>
    <img src="BeautySalon.jpg" width="500" height="400"></img>  
      </div>
      <div style={sakrij}>
      </div>
      </Container>)
    }

    const loginForma = () => {
      const sakrij = { display: loginVidljiv ? 'none' : '' }
     const prikazi = { display: loginVidljiv ? '' : 'none'}
      return (
        <div>
           <div style={sakrij}> 
          </div>
          <div style={prikazi}  className="promjenjiviSadrzaj"> 
          <h1 style={naslov}>Sign In</h1>
          <Button  startIcon={<ArrowBackIcon/>}  style ={natrag}variant="outlined" color="secondary" onClick={() =>{postaviLoginVidljivost(false); postaviRegistracijaVidljivost(false);postaviPocetnaVidljivost(true);}}>Back</Button>
          <LoginForma
      username={username}
      pass={pass}
      promjenaImena={({ target }) => postaviUsername(target.value)}
      promjenaLozinke={({ target }) => postaviPass(target.value)}
      userLogin={userLogin}
    />
          </div>
      
        </div>
      )
    }
    const options=[ {key:'M',text:'M'},
    {key:'F',text:'F'}]
    const registracijaForma = () => {
      const sakrij = { display: registracijaVidljiva? 'none' : '' }
      const prikazi = { display: registracijaVidljiva ? '' : 'none' }
     
      return (
        <div>
          <div style={sakrij}>
          </div>
          <div style={prikazi}> 
          <h1 style={naslov}>Sign Up</h1>
          <Button startIcon={<ArrowBackIcon/>}  style ={natrag} variant="outlined" color="secondary"onClick={() => {postaviRegistracijaVidljivost(false);postaviLoginVidljivost(false);postaviPocetnaVidljivost(true)}}>Back</Button>
          <RegistracijaForma
      username={username}
      pass={pass}
      pass1={pass1}
      ime={ime}
      prezime={prezime}
      spol={spol}
      mob={mob}
      options={options}
      promjenaKorImena={({ target }) => postaviUsername(target.value)}
      promjenaLozinke={({ target }) => postaviPass(target.value)}
      promjenaLozinke1={({target})=>postaviPass1(target.value)}
      promjenaImena={({ target }) => postaviIme(target.value)}
      promjenaPrezimena={({ target }) => postaviPrezime(target.value)}
      promjenaSpola={({ target }) => postaviSpol(target.value)}
      promjenaMoba={({ target }) => postaviMob(target.value)}
      userRegistration={userRegistration}
    />
          </div>
        </div>
      )
    }
    const editDiv={
      marginLeft:'250px'
    }
    const editForma=()=>{
      const sakrij = { display: editVidljiv? 'none' : '' }
      const prikazi = { display: editVidljiv ? '' : 'none' }
      return (
        <div style={editDiv}>
          <div style={sakrij}>
             <Button variant="contained" color="secondary" startIcon={<EditOutlinedIcon />} onClick={() => postaviEditVidljivost(true)}>Edit</Button> 
          </div>
          <div style={prikazi}> 
          <EditForma
      username={korisnik.username}
      spol={spol}
      options={options}
      promjenaLozinke={({ target }) => postaviPass(target.value)}
      promjenaLozinke1={({target})=>postaviPass1(target.value)}
      promjenaImena={({ target }) => postaviIme(target.value)}
      promjenaPrezimena={({ target }) => postaviPrezime(target.value)}
      promjenaSpola={({ target }) => postaviSpol(target.value)}
      promjenaMoba={({ target }) => postaviMob(target.value)}
      userEdit={userEdit}
      promjenaEditVidljivosti={(target)=>postaviEditVidljivost(target.value)}
    />
          </div>
        </div>
      )

    }

    const profilForma=()=>{
      const sakrij = { display: profilVidljiv? 'none' : '' }
      const prikazi = { display: profilVidljiv ? '' : 'none' }
      return (
        <div>
          <div style={sakrij}>
          </div>
          <div style={prikazi}> 
          <Button  startIcon={<ArrowBackIcon/>}  style ={natrag} variant="outlined" color="secondary"  onClick={() => {postaviProfilVidljiv(false)}}>Back</Button>
       <br></br>
          <div style={divProfil}>     
          <div>
          <h3 style={h3naslovi}>About you <i>{korisnik.ime}</i></h3>
          <ProfilForma
      username={korisnik.username}
      pass={pass}
      ime={korisnik.ime}
      prezime={korisnik.prezime}
      spol={korisnik.spol}
      mob={korisnik.mob}
    />
      </div>
      <img src="unnamed.png" width='300' height='250'></img>
          </div>
          </div>
        </div>
      )
    }
    const adminForma=()=>{
      const Ispis=rezervacije.filter(rezervacija=>Date.parse(rezervacija.datum)>=Date.parse(today))
      return(
      <div>
        <br></br>
        <h2 style={h3naslovi}>Upcoming reservations</h2>
        <ul>
        {Ispis.sort(function(a,b){return Date.parse(a.datum)>Date.parse(b.datum)?1:-1}).map(r =>
          <RezervacijaKor key={r.id} rezervacija={r} brisiRezervaciju={()=>brisiRezervaciju(r.id)}/>
          )} 
      </ul>
      </div>)
    }
   
    const RezervacijaForma = () => (
      <div>
        
         <Button style={btnProfile} variant="contained" color="secondary" startIcon={<PersonIcon />} onClick={() => {postaviProfilVidljiv(true);}}>My profile</Button>
      <div style={container}>
        <div>
          <div style={sredina}>
          <h2 style={h3naslovi}>About us :)</h2>
          <p>Working hours:</p>
          <p>Every day <b>07:00 am - 12:00 am</b></p>
          <p style={h3naslovi}><b>Hurry up and make an reservation!</b></p>
          </div>
        </div>
      <div style={div1}>
      <form onSubmit={novaRezervacija}>
        <h3 style={h3naslovi}>New reservation</h3>
      <DateCalendar value={odabirDatuma}  funk={(odabir) => odabraniDat(odabir)}/>
       {/* //onChange={promjenaDatuma} */}
      <Dropdown options={optionsTermin} value={odabirPocetka} onChange={promjenaPocetka} /><br></br><br></br>
      <label>Tretman:</label>
      <Tretman value={odabirTretmana} prjenos={odabirTretmana} onChange={promjenaTretmana} funkcija={(odab)=>odabraniTretman(odab)}></Tretman><br></br><br></br>
        <Button variant="contained" color="secondary" startIcon={<AddBoxIcon />} type='submit'>Save</Button>
      </form>
      </div>
      <div style={div2}>
         <h3 style={h3naslovi}>My reservations</h3>
         <ul>
        {rezervacijeZaIspis.sort(function(a,b){return Date.parse(a.datum)>Date.parse(b.datum)?1:-1}).map(r => <Rezervacija key={r.id} rezervacija={r} brisiRezervaciju={()=>brisiRezervaciju(r.id)}/>)}
      </ul>
      </div>
      </div>
      </div>      
    )
    return (
      <div>
      	
{korisnik === null 
  ?  pocetnaVidljiva===true? pocetnaForma(): loginVidljiv===true?loginForma():registracijaForma()
  : <div>
     <div>
      {(info &&
      <Alert severity="success">
           {info}
      </Alert> )}
      </div>
       <br></br>
       <h1 style={naslov3}>Beauty - reservations</h1>
       <Button variant="outlined" color="secondary"  startIcon={<ExitToAppOutlinedIcon />} style={odjavaStil} onClick={() => {window.localStorage.clear(); postaviKorisnika(null); postaviPocetnaVidljivost(true); postaviLoginVidljivost(false);postaviProfilVidljiv(false); postaviPass('')}}>Sign out</Button>
       {korisnik.username=="adragicevic"?  adminForma():profilVidljiv===true?profilForma() : RezervacijaForma()}
       {profilVidljiv===true?editForma():'' }
    </div>
}
</div>
    )
  }

  export default App