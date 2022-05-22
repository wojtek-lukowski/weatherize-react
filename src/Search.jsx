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
  const [isInFavs, setIsInFavs] = useState();
  const [favorites, setFavorites] = useState([]);
  const [favsManipulation, setFavsManipulation] = useState(false);
  const maxFavsNumber = 5;

  useEffect(() => {
    setFavorites(props.favorites);
    if (favorites.includes(city)) {
      setIsInFavs(true)
    } else {
      setIsInFavs(false)
    }
  }), []

  const searchCity = (e) => {
    setIsLogging(true);
    e.preventDefault();
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
      // const data = (fetch(api)).json()
      .then(response => {
        const data = response.data;
        console.log(data);
        // console.log('city from API', data.name);
        getFavs(data.name);
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
        setIsLogging(false);
        // window.open('/', '_self');
      })
    // console.log('city state set to', city);
    setCityCompleted(true);
  }

  const getFavs = (city) => {
    const token = localStorage.getItem('weatherize-token');
    const user = localStorage.getItem('weatherize-username');
    axios.get(`https://weatherize-app.herokuapp.com/users/${user}`,
      { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        // console.log('response favs', response.data.favorites);
        // setFavorites(response.data.favorites);
        // if (response.data.favorites.includes(city)) {
        //   setIsInFavs(true)
        // } else {
        //   setIsInFavs(false)
        // }
        console.log(response.data.favorites);
      })
      .catch(error => {
        console.log('error', error);
      })
    props.getFavs();
  }

  const addToFavs = (city) => {
    setFavsManipulation(true);
    const token = localStorage.getItem('weatherize-token');
    const user = localStorage.getItem('weatherize-username');
    console.log('adding to favs:', city);
    if (favorites.length >= maxFavsNumber) {
      removeFromFavs(favorites[0])
    }
    axios.post(`https://weatherize-app.herokuapp.com/users/${user}/${city}`, {},
      { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        console.log('add confirmation:', response);
        getFavs(city);
        props.getFavs();
        setFavsManipulation(false);
      })
      .catch(error => {
        console.log('error', error);
      })

  }

  const removeFromFavs = (city) => {
    setFavsManipulation(true);
    console.log('removing from favs:', city);
    const token = localStorage.getItem('weatherize-token');
    const user = localStorage.getItem('weatherize-username');
    axios.delete(`https://weatherize-app.herokuapp.com/users/${user}/${city}`,
      { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        console.log(response);
        // getFavs(city);
        props.getFavs();
        setFavsManipulation(false);
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  // console.log('city', city)
  // console.log('favorites', favorites)
  // console.log('isInFavs', isInFavs)

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
        <div className='favs'>
          {city &&
            <div className='current-location-card'>
              <div className='card-header'>
                <h2 className="location">{city}, <span>{country}</span></h2>
                {/* {isInFavs ?
                  <svg
                    onClick={() => {
                      setIsInFavs(false)
                      removeFromFavs(city);
                    }} width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1C3.6868 1 1 3.6592 1 6.94C1 9.5884 2.05 15.874 12.3856 22.228C12.5707 22.3406 12.7833 22.4002 13 22.4002C13.2167 22.4002 13.4293 22.3406 13.6144 22.228C23.95 15.874 25 9.5884 25 6.94C25 3.6592 22.3132 1 19 1C15.6868 1 13 4.6 13 4.6C13 4.6 10.3132 1 7 1Z" fill="#A3A3A3" stroke="#A3A3A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg> :
                  <svg onClick={() => {
                    setIsInFavs(true)
                    addToFavs(city);
                  }}
                    width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1C3.6868 1 1 3.6592 1 6.94C1 9.5884 2.05 15.874 12.3856 22.228C12.5707 22.3406 12.7833 22.4002 13 22.4002C13.2167 22.4002 13.4293 22.3406 13.6144 22.228C23.95 15.874 25 9.5884 25 6.94C25 3.6592 22.3132 1 19 1C15.6868 1 13 4.6 13 4.6C13 4.6 10.3132 1 7 1Z" stroke="#A3A3A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                } */}
                {isInFavs && !favsManipulation &&
                  <svg
                    onClick={() => {
                      setIsInFavs(false)
                      removeFromFavs(city);
                    }} width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1C3.6868 1 1 3.6592 1 6.94C1 9.5884 2.05 15.874 12.3856 22.228C12.5707 22.3406 12.7833 22.4002 13 22.4002C13.2167 22.4002 13.4293 22.3406 13.6144 22.228C23.95 15.874 25 9.5884 25 6.94C25 3.6592 22.3132 1 19 1C15.6868 1 13 4.6 13 4.6C13 4.6 10.3132 1 7 1Z" fill="#A3A3A3" stroke="#A3A3A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                }
                {isInFavs && favsManipulation &&
                  <svg className='confirmation'
                    width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1C3.6868 1 1 3.6592 1 6.94C1 9.5884 2.05 15.874 12.3856 22.228C12.5707 22.3406 12.7833 22.4002 13 22.4002C13.2167 22.4002 13.4293 22.3406 13.6144 22.228C23.95 15.874 25 9.5884 25 6.94C25 3.6592 22.3132 1 19 1C15.6868 1 13 4.6 13 4.6C13 4.6 10.3132 1 7 1Z" fill="#A3A3A3" stroke="#A3A3A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                }
                {!isInFavs && !favsManipulation &&
                  <svg onClick={() => {
                    setIsInFavs(true)
                    addToFavs(city);
                  }}
                    width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1C3.6868 1 1 3.6592 1 6.94C1 9.5884 2.05 15.874 12.3856 22.228C12.5707 22.3406 12.7833 22.4002 13 22.4002C13.2167 22.4002 13.4293 22.3406 13.6144 22.228C23.95 15.874 25 9.5884 25 6.94C25 3.6592 22.3132 1 19 1C15.6868 1 13 4.6 13 4.6C13 4.6 10.3132 1 7 1Z" stroke="#A3A3A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                }
                {!isInFavs && favsManipulation &&
                  <svg className='confirmation'
                    width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1C3.6868 1 1 3.6592 1 6.94C1 9.5884 2.05 15.874 12.3856 22.228C12.5707 22.3406 12.7833 22.4002 13 22.4002C13.2167 22.4002 13.4293 22.3406 13.6144 22.228C23.95 15.874 25 9.5884 25 6.94C25 3.6592 22.3132 1 19 1C15.6868 1 13 4.6 13 4.6C13 4.6 10.3132 1 7 1Z" fill="#A3A3A3" stroke="#A3A3A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                }
              </div>
              <ul>
                <li className="temperature">{temperature} C°</li>
                <li className='sky'>{sky}</li>
                <li>{feelsLike} C°<span>feels like</span></li>
                <li>{tempMin} C°<span>min</span></li>
                <li>{tempMax} C°<span>max</span></li>
                <li>{windSpeed} m/s {windDirection}<span>wind</span></li>
              </ul>
              <Link to={{
                pathname: `/${city}`,
                city,
                fromFavorites: true
              }}>
                <p className='more'>more</p>
              </Link>
            </div>
          }
        </div >
      }
    </div>
  );
}

export default Search;