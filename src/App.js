import React, {useState} from 'react'
import './App.css';
import Key from './Apikey'
import Form from './Form'
import Weather from './Weather'

const APIKEYD = Key.APIKEY

function App() {
  const [weather, setWeather] = useState([])

  async function fetchData(e){
    e.preventDefault()
    const  city = e.target.elements.city.value
    const  country = e.target.elements.country.value
    
    const apiData = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIKEYD}`)
    .then(res =>res.json())
    .then(data => data)
     
    if(city && country){

    setWeather({
      data:apiData,
      city:apiData.name,
      country:apiData.sys.country,
      temperature:Math.round(apiData.main.temp * 9/5 - 459.67),
      description:apiData.weather[0].description,
      error:""
    }
    )
  }else{
    setWeather({
      data:'',
      city:'',
      country:'',
      temperature:'',
      description:'',
      error:'Please enter a city and country'
    }
    )
  }
   
  }

  return (
    <div className="App">
        <h3>Weather Hooks</h3>
        <Form getWeather = {fetchData}/>
        <Weather
         city={weather.city}
         country ={weather.country}
         temperature ={weather.temperature}
         description={weather.description}
         error={weather.error}
        />
        {console.log(weather.data)}
    </div>
  );
}

export default App;
