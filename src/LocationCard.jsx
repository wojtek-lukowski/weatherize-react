import React from 'react';
import { useState, useEffect } from 'react';
import { config } from './config';
const key = config.API_KEY;



export class LocationCard extends React.Component {

  constructor(props) {
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
    this.weatherCity(this.props.city);
  }

  async weatherCity(city) {
    try {
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
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
      console.log(this.state);
    } catch (err) {
      console.log(err);
      // setError(true);
    }
    // console.log('conditions', conditions);
  };

  render() {

    return (
      // <div>{this.props.city}</div>
      <div>
        <div>
          {this.state.location &&
            <div className="">
              <div>{this.props.city}, {this.state.country}</div>
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













// function LocationCard(props) {
//   console.log('props', props);

//   // const [location, setLocation] = useState(props.city);
//   const [country, setCountry] = useState();
//   const [temperature, setTemperature] = useState();
//   const [sky, setSky] = useState();
//   const [windSpeed, setWindSpeed] = useState();
//   const [windDirection, setWindDirection] = useState();
//   const [error, setError] = useState(false);

//   const [conditions, setConditions] = ([]);

//   // const [allState, setAllState] = useState({
//   //   location: props.city,
//   //   country: '',
//   //   temperature: '',
//   //   wind: ''
//   // })

//   weatherCity(props.city);

//   async function weatherCity(city) {
//     console.log('fetching data for', city);
//     console.log('conditions', conditions);
//     try {
//       const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
//       const data = await (await fetch(api)).json();
//       console.log(data);

//       // console.log('state after', allState);

//       // setLocation(data.name);
//       // setCountry(data.sys.country);
//       // setTemperature((data.main.temp - 273.15).toFixed(1));
//       // setSky(data.weather[0].main);
//       // setWindSpeed(data.wind.speed);
//       // setWindDirection(data.wind.deg);

//       // return ([data.name, data.sys.country, (data.main.temp - 273.15).toFixed(1), data.weather[0].main, data.wind.speed, data.wind.deg]);
//       // setConditions([data.name, data.sys.country, (data.main.temp - 273.15).toFixed(1), data.weather[0].main, data.wind.speed, data.wind.deg]);

//     } catch (err) {
//       console.log(err);
//       // setError(true);
//     }
//     // console.log('conditions', conditions);
//   };

//   return (

//     <div>{props.city}</div>


//     // <div>
//     //   <div>
//     //     {props.city &&
//     //       <div className="">
//     //         <div>{props.city}, {country}</div>
//     //         {!error &&
//     //           <div>
//     //             <div>{temperature} C°</div>
//     //             <div>{sky}</div>
//     //             <div>{windSpeed} m/s {windDirection}°</div>
//     //           </div>
//     //         }
//     //       </div>
//     //     }
//     //     {props.city && !country && !error &&
//     //       <div className="">
//     //         Loading
//     //       </div>
//     //     }
//     //     {error &&
//     //       <div>No data</div>
//     //     }
//     //   </div>
//     // </div>
//   );
// }

// export default LocationCard;