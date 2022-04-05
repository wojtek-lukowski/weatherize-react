import React from 'react';
// import { useState, useEffect } from 'react';
import { config } from './config';
import axios from 'axios';
// import Loading from './Loading'
const key = config.API_KEY;


export class CurrentLocationCard extends React.Component {

  constructor() {
    super();

    this.state = {
      location: '',
      country: '',
      temperature: '',
      sky: '',
      windSpeed: '',
      windDirection: ''
    }
  }

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(success);
    function success(pos) {
      const crd = pos.coords;
      console.log('current position: ', crd.latitude, crd.longitude);
      localStorage.setItem('latitude', crd.latitude);
      localStorage.setItem('longitude', crd.longitude);
    };
    this.getWeather();
  }

  async getWeather() {
    console.log('calling getWeather');
    try {
      const lat = localStorage.getItem('latitude');
      const lng = localStorage.getItem('longitude');
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`;
      const data = await (await fetch(api)).json();
      console.log(data);
      this.setState({
        location: data.name,
        country: data.sys.country,
        temperature: (data.main.temp - 273.15).toFixed(1),
        sky: data.weather[0].main,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg
      })
    } catch (err) {
      console.log(err);
    }
    console.log(this.state);
  };

  render() {

    return (
      // <div>test - {this.state.location}</div>
      <div>
        <div>
          {this.state.location &&
            <div className="">
              <div>{this.state.location}, {this.state.country}</div>
              <div>{this.state.temperature} C°</div>
              <div>{this.state.sky}</div>
              <div>{this.state.windSpeed} m/s {this.state.windDirection}°</div>
            </div>
          }
        </div>
      </div>
    )
  }

}





// function CurrentLocationCard() {

//   const [location, setLocation] = useState();
//   const [country, setCountry] = useState();
//   const [temperature, setTemperature] = useState();
//   const [sky, setSky] = useState();
//   const [windSpeed, setWindSpeed] = useState();
//   const [windDirection, setWindDirection] = useState();

//   const [error, setError] = useState(false);

//   // const [currentLocation, setCurrentLocation] = useState({
//   //   location: '',
//   //   country: '',
//   //   temperature: '',
//   //   wind: ''
//   // });

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(success);
//     function success(pos) {
//       const crd = pos.coords;
//       console.log('current position: ', crd.latitude, crd.longitude);
//       getWeather(crd.latitude, crd.longitude);
//     };
//   })

//   async function getWeather(lat, lng) {
//     // setLoading(true);
//     try {
//       const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`;
//       const data = await (await fetch(api)).json();
//       console.log(data);

//       // setCurrentLocation(
//       // { location: data.name },
//       //   { country: data.country },
//       //   { temperature: (data.main.temp - 273.15).toFixed(1) },
//       //   { wind: data.wind.speed }
//       // )

//       setLocation(data.name);
//       setCountry(data.sys.country);
//       setTemperature((data.main.temp - 273.15).toFixed(1));
//       setSky(data.weather[0].main);
//       setWindSpeed(data.wind.speed);
//       setWindDirection(data.wind.deg);

//     } catch (err) {
//       console.log(err);
//       setError(true);
//     }
//     // setLoading(false);
//   };

//   // function getWeather(lat, lng) {

//   //   axios.get(`https://api.openweathermap.org/weather/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`)
//   //     .then((response) => {
//   //       console.log(response)
//   //       setLocation(response.name);
//   //       setCountry(response.sys.country);
//   //       setTemperature((response.main.temp - 273.15).toFixed(1));
//   //       setSky(response.weather[0].main);
//   //       setWindSpeed(response.wind.speed);
//   //       setWindDirection(response.wind.deg);
//   //     })
//   //     .catch(function (error) {
//   //       console.log(error);
//   //     });

//   // }

//   return (
//     <div>
//       <div>
//         {location &&
//           <div className="">
//             <div>{location}, {country}</div>
//             <div>{temperature} C°</div>
//             <div>{sky}</div>
//             <div>{windSpeed} m/s {windDirection}°</div>
//           </div>
//         }
//         {!location && !error &&
//           <div>Loading</div>
//         }
//         {!location && error &&
//           <div>No data</div>
//         }
//       </div>
//     </div>
//   );
// }

// export default CurrentLocationCard;