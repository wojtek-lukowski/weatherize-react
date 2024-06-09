import React from 'react';
import { Link } from 'react-router-dom';
import { FavsHourly } from './FavsHourly';

export class SearchedLocation extends React.Component {

  constructor(props) {
    super();

    this.state = {
      location: '',
      country: '',
      temperature: '',
      feelsLike: '',
      tempMax: '',
      tempMin: '',
      sky: '',
      windSpeed: '',
      windDirection: ''
    }
  }

  componentDidMount() {
    console.log('searched location card props', this.props);
    this.weatherCity(this.props.city);
  }

  async weatherCity(city) {
    const token = localStorage.getItem('weatherize-token')
    try {
      const result = await axios.get(`https://weatherize-app.herokuapp.com/weather`, {
        params: {
          lat,
          lng
        }
      },
        { headers: { Authorization: `Bearer ${token}` } })
      console.log(result);
      this.setState({
        location: result.data.name,
        country: result.data.sys.country,
        temperature: (result.data.main.temp - 273.15).toFixed(1),
        tempMax: (result.data.main.temp_max - 273.15).toFixed(1),
        sky: result.data.weather[0].main,
        windSpeed: result.data.wind.speed.toFixed(1),
        // windDirection: data.wind.deg
      })

      let windD = result.data.wind.deg;

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

      this.setState({
        windDirection: windD
      })
    } catch (err) {
      console.log(err);
    }
  };

  render() {

    return (
      <div className='favs'>
        {
          this.state.location &&
          <div className='current-location-card'>
            <h2 className="location">{this.state.location}, <span>{this.state.country}</span></h2>
            <ul>
              <li className="temperature">{this.state.temperature} C°</li>
              <li className='sky'>{this.state.sky}</li>
              <li>{this.state.feelsLike} C°<span>feels like</span></li>
              <li>{this.state.tempMin} C°<span>min</span></li>
              <li>{this.state.tempMax} C°<span>max</span></li>
              <li>{this.state.windSpeed} m/s {this.state.windDirection}<span>wind</span></li>
            </ul>
          </div>
        }
      </div >
    )
  }

}