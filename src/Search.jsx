import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { config } from './config';
import Loading from './Loading';
import axios from 'axios';
import { LocationCard } from './LocationCard';
import { SearchedLocation } from './SearchedLocation';
const key = config.API_KEY;

function Search(props) {

  const [isLogging, setIsLogging] = useState(false);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [temperature, setTemperature] = useState('');
  const [feelsLike, setFeelsLike] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [sky, setSky] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [windDirection, setDirection] = useState('');
  const [cityCompleted, setCityCompleted] = useState(false);


  const searchCity = (e) => {
    setIsLogging(true);
    e.preventDefault();
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
      // const data = (fetch(api)).json()
      .then(response => {
        const data = response.data;
        console.log(data);
        setCity(data.name);
        setCountry(data.sys.country);
        setTemperature((data.main.temp - 273.15).toFixed(1));
        setFeelsLike((data.main.feels_like - 273.15).toFixed(1));
        setTempMax((data.main.temp_max - 273.15).toFixed(1));
        setTempMin((data.main.temp_min - 273.15).toFixed(1));
        setSky(data.weather[0].main);
        setWindSpeed(data.wind.speed.toFixed(1));
        let windD = data.wind.deg;
        if (windD > 348 || windD <= 11) { windD = "N" };
        if (windD > 11 && windD <= 33) { windD = "NNE" };
        if (windD > 33 && windD <= 56) { windD = "NE" };
        if (windD > 56 && windD <= 78) { windD = "ENE" };
        if (windD > 78 && windD <= 101) { windD = "E" };
        if (windD > 101 && windD <= 123) { windD = "ESE" };
        if (windD > 123 && windD <= 146) { windD = "SE" };
        if (windD > 146 && windD <= 168) { windD = "SSE" };
        if (windD > 168 && windD <= 191) { windD = "S" };
        if (windD > 191 && windD <= 213) { windD = "SSW" };
        if (windD > 213 && windD <= 236) { windD = "SW" };
        if (windD > 236 && windD <= 258) { windD = "WSW" };
        if (windD > 258 && windD <= 281) { windD = "W" };
        if (windD > 281 && windD <= 303) { windD = "NWN" };
        if (windD > 303 && windD <= 326) { windD = "NW" };
        if (windD > 326 && windD <= 348) { windD = "NNW" };
        setDirection(windD);
        setIsLogging(false);
      })
      .catch(error => {
        console.log('error', error);
        alert('Not found. Try other location.');
        setCity('');
        // window.open('/', '_self');
      })
    setCityCompleted(true);
  }

  console.log(city, country, temperature);

  return (
    <div className='search-component'>
      <div className='search'>
        {/* <form> */}
        <input placeholder='Enter a city' id='city-input' type='text' value={city}
          onChange={(e) => { setCity(e.target.value); setCityCompleted(false) }}>
        </input>
        {isLogging ?
          <button className='button-primary loading'>Searching...</button> :
          <button
            className='button-primary'
            type='submit'
            onClick={e => searchCity(e)}
          >Search</button>
        }
        {/* </form> */}
      </div>
      {cityCompleted &&
        <Link to={{
          pathname: `/${city}`,
          city,
          fromFavorites: true
        }}>
          <div className='favs'>
            {
              city &&
              <div className='current-location-card'>
                <h2 className="location">{city}, <span>{country}</span></h2>
                <ul>
                  <li className="temperature">{temperature} C°</li>
                  <li className='sky'>{sky}</li>
                  <li>{feelsLike} C°<span>feels like</span></li>
                  <li>{tempMin} C°<span>min</span></li>
                  <li>{tempMax} C°<span>max</span></li>
                  <li>{windSpeed} m/s {windDirection}<span>wind</span></li>
                </ul>
              </div>
            }
          </div >
        </Link>
      }
      <SearchedLocation city={city} />
      <LocationCard city={city} />
    </div>
  );
}

export default Search;