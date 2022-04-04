import { useState, useEffect } from 'react';
import { config } from './config';
const key = config.API_KEY;

function LocationCard(props) {
  console.log('props', props);

  // let cities = ['Tokyo', "Warszawa", 'Los Angeles'];

  // const [location, setLocation] = useState();
  // const [country, setCountry] = useState();
  const [country, setCountry] = useState();
  const [temperature, setTemperature] = useState();
  const [sky, setSky] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [windDirection, setWindDirection] = useState();
  const [error, setError] = useState(false);


  weatherCity(props.city);

  async function weatherCity(city) {
    console.log('fetching', city);
    try {
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
      const data = await (await fetch(api)).json();
      console.log(data);
      // console.log(data.name);
      // console.log(data.sys.country);
      // console.log(data.main.temp - 273.15);

      // setCurrentLocation(
      // { location: data.name },
      //   { country: data.country },
      //   { temperature: (data.main.temp - 273.15).toFixed(1) },
      //   { wind: data.wind.speed }
      // )

      // setLocation(data.name);
      setCountry(data.sys.country);
      setTemperature((data.main.temp - 273.15).toFixed(1));
      setSky(data.weather[0].main);
      setWindSpeed(data.wind.speed);
      setWindDirection(data.wind.deg);

    } catch (err) {
      console.log(err);
      setError(true);

    }
  };

  return (

    <div>
      <div>
        {props.city &&
          <div className="">
            <div>{props.city}, {country}</div>
            <div>{temperature} C°</div>
            <div>{sky}</div>
            <div>{windSpeed} m/s {windDirection}°</div>
          </div>
        }
        {props.city && !country && !error &&
          <div className="">
            Loading
          </div>
        }
        {error &&
          <div>No data</div>
        }
      </div>
    </div>
  );
}

export default LocationCard;