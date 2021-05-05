import React, {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment, { parseTwoDigitYear } from 'moment'

 function DateCalendar(props) {
  const [dateState, setDateState] = useState(new Date())
  const changeDate = (e) => {
    setDateState(e)
  }
 

const today=new Date(moment());
const maxdate=new Date(moment().add(30,'day'));

props.funk((dateState));

  return (
    <>
      <Calendar 
        minDate={today}
        maxDate={maxdate}
       value={dateState}
      onChange={changeDate}
    
      />
       
    <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
 
    </>
  )
}
export default DateCalendar;