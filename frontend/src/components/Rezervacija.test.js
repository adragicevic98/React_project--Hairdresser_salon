	
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Rezervacija from './Rezervacija'
import EditForma from './EditForma'
import { configure,mount,shallow } from "enzyme";
import reactDOM from 'react-dom'
import LoginForma from './LoginForma'

test('renderira sadrzaj', () => {
    const rezervacija = {
        datum:"2021-02-09",
        pocetak:"10",
        kraj:"11",
        tretman:"testiranje"
    }
   
    const komponenta = render(
      <Rezervacija rezervacija={rezervacija} />
    )
    	
komponenta.debug()
    expect(komponenta.container).toHaveTextContent('testiranje')
    
  })
  test('klik poziva event handler', () => {
    const rezervacija = {
        datum:"2021-02-09",
        pocetak:"10",
        kraj:"11",
        tretman:"testiranje"
    }
   
    const testHandler = jest.fn()
   
    const komponenta = render(
      <Rezervacija rezervacija={rezervacija} brisiRezervaciju={testHandler} />
    )
    const button = komponenta.container.querySelector('.test')
    fireEvent.click(button)
   
    expect(testHandler.mock.calls).toHaveLength(1)
   
  })
	
test('rezervacije.js',()=>{
    const rezervacija = {
        datum:"2021-02-09",
        pocetak:"10",
        kraj:"11",
        tretman:"testiranje"
    }
    const komponenta = render(<Rezervacija rezervacija={rezervacija} />)
    expect(komponenta.container).toHaveTextContent("testiranje");
   
})
 test ('Has a button',()=> {
   const root=document.createElement("div")
   reactDOM.render(<LoginForma/>,root)
   expect(root.querySelector("button").textContent).toBe("Sign In")});

