import React from 'react'
import moment, { parseTwoDigitYear } from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import {Container,Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper} from '@material-ui/core'

const razmak={
    margin:'5px'
}

const Rezervacija =({rezervacija,brisiRezervaciju})=>{
    return(
        <li className="rezervacija">
            {moment(rezervacija.datum).format('MMMM Do YYYY')+moment().hour(parseInt(rezervacija.pocetak)).minutes(0).format(' hh:mm')+" - "+moment().hour(parseInt(rezervacija.kraj)).minutes(0).format(' hh:mm')+" - "+rezervacija.tretman+"  "}
           <Button variant="contained" color="secondary" style={razmak} className="test"startIcon={<DeleteIcon />} onClick={brisiRezervaciju}>Delete</Button>
        </li>
    )
}

export default Rezervacija