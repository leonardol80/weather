import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import CardWeather from './components/CardWeather'

function App() {
  const [coords, setCoords] = useState()
  

  useEffect(() => {

    const success = pos =>{
      // console.log(pos.coords)
      const latlon={
        lat:pos.coords.latitude,
        lon:pos.coords.longitude
      }
      setCoords(latlon)
    }
    navigator.geolocation.getCurrentPosition(success);
      
  }, []);

  return (
    <div className="App">
      <CardWeather lon={coords?.lon} lat={coords?.lat} />
    </div>
  )
}

export default App
