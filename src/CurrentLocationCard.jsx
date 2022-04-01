import { useState, useEffect } from 'react';
import { config } from './config';
import axios from 'axios';
import Loading from './Loading'
const key = config.API_KEY;

function CurrentLocationCard() {

  // const [data, setData] = useState();
  const [location, setLocation] = useState();
  const [country, setCountry] = useState();
  const [temperature, setTemperature] = useState();
  const [sky, setSky] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [windDirection, setWindDirection] = useState();

  const [loading, setLoading] = useState();


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    function success(pos) {
      const crd = pos.coords;
      console.log('current position: ', crd.latitude, crd.longitude);
      getWeather(crd.latitude, crd.longitude);
    };

    async function getWeather(lat, lng) {
      // setLoading(true);
      try {
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`;
        const data = await (await fetch(api)).json();
        console.log(data);
        console.log(data.name);
        console.log(data.sys.country);
        console.log(data.main.temp - 273.15);

        // setData(data);
        setLocation(data.name);
        setCountry(data.sys.country);
        setTemperature((data.main.temp - 273.15).toFixed(1));
        setSky(data.weather[0].main);
        setWindSpeed(data.wind.speed);
        setWindDirection(data.wind.deg);

      } catch (err) {
        console.log(err)
      }
      // setLoading(false);
    };
  }
  )

  // navigator.geolocation.getCurrentPosition(success);
  // function success(pos) {
  //   const crd = pos.coords;
  //   console.log('current position: ', crd.latitude, crd.longitude);
  //   getWeather(crd.latitude, crd.longitude);
  // };

  // async function getWeather(lat, lng) {
  //   // setLoading(true);
  //   try {
  //     const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`;
  //     const data = await (await fetch(api)).json();
  //     console.log(data);
  //     console.log(data.name);
  //     console.log(data.sys.country);
  //     console.log(data.main.temp - 273.15);

  //     // setData(data);
  //     setLocation(data.name);
  //     // setCountry(data.sys.country);
  //     // setTemperature((data.main.temp - 273.15).toFixed(1));
  //     // setSky(data.weather[0].main);
  //     // setWindSpeed(data.wind.speed);
  //     // setWindDirection(data.wind.deg);

  //   } catch (err) {
  //     console.log(err)
  //   }
  //   // setLoading(false);
  // };

  // function getWeather(lat, lng) {

  //   axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`)
  //     .then((response) => {
  //       console.log(response)
  //       setLocation(response.name);
  //       setCountry(response.sys.country);
  //       setTemperature((response.main.temp - 273.15).toFixed(1));
  //       setSky(response.weather[0].main);
  //       setWindSpeed(response.wind.speed);
  //       setWindDirection(response.wind.deg);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  // }


  return (
    <div>
      {loading &&
        <Loading />
      }
      {!loading &&
        <div>
          {location &&
            <div className="">
              <div>{location}, {country}</div>
              <div>{temperature} C°</div>
              <div>{sky}</div>
              <div>{windSpeed} m/s {windDirection} °</div>
            </div>
          }
          {!location &&
            <div>No location</div>
          }
        </div>
      }
    </div>
  );
}

export default CurrentLocationCard;