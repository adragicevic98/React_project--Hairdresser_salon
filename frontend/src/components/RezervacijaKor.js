import React from 'react'
import moment, { parseTwoDigitYear } from 'moment'

const RezervacijaKor =({rezervacija,brisiRezervaciju})=>{
    return(
        <li className="rezervacija">
            {moment(rezervacija.datum).format('MMMM Do YYYY')+moment().hour(parseInt(rezervacija.pocetak)).minutes(0).format(' hh:mm')+" - "+
            moment().hour(parseInt(rezervacija.kraj)).minutes(0).format(' hh:mm')+" - "+rezervacija.tretman+" - "+rezervacija.korisnik.ime+" "+rezervacija.korisnik.prezime+" -> Mob: "+rezervacija.korisnik.mob}
        </li>
    )
}
export default RezervacijaKor