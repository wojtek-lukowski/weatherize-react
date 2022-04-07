import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { config } from './config';
const key = config.API_KEY;

function Login() {

  // const [tempHourly, setTempHourly] = useState([]);

  const tempHourly = [];

  const location = localStorage.getItem('location');
  const country = localStorage.getItem('country');

  useEffect(() => {
    const lat = localStorage.getItem('latitude');
    const lng = localStorage.getItem('longitude');
    getWeather(lat, lng);
  })

  async function getWeather(lat, lng) {
    try {
      const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${key}`;
      const data = await (await fetch(api)).json();
      console.log(data);
      // console.log(data.hourly);
      const baz = (data.hourly);

      const foo = [];

      // setTempHourly([]);

      for (let i = 0; i < baz.length; i++) {
        tempHourly.push((data.hourly[i].temp - 273.15).toFixed(1));
      }
      console.log(foo);

      // setTempHourly(foo);
      console.log(tempHourly);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>{location}, {country}</h2>
      <h2>Hourly</h2>
      {tempHourly.map(hour =>
        <p>{hour}</p>)
      }
      <nav>
        <Link to='/'>Home</Link>
      </nav>
    </div>
  );
}

export default Login;