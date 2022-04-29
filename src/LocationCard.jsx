import React from 'react';
import { config } from './config';
import { Link } from 'react-router-dom';
import { FavsHourly } from './FavsHourly';
import axios from 'axios';
const key = config.API_KEY;

export class LocationCard extends React.Component {

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
      windDirection: '',
      isInFavs: false,
      favorites: []
    }
  }

  componentDidMount() {
    // console.log('location card props', this.props);
    this.getFavs(this.props.city);
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
        feelsLike: (data.main.feels_like - 273.15).toFixed(1),
        tempMax: (data.main.temp_max - 273.15).toFixed(1),
        tempMin: (data.main.temp_min - 273.15).toFixed(1),
        sky: data.weather[0].main,
        windSpeed: data.wind.speed.toFixed(1),
        // windDirection: data.wind.deg
      })

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

      this.setState({
        windDirection: windD
      })
    } catch (err) {
      console.log(err);
    }
  };

  async getFavs(city) {
    const token = localStorage.getItem('weatherize-token');
    const user = localStorage.getItem('weatherize-username');
    try {
      const data = await axios.get(`https://weatherize-app.herokuapp.com/users/${user}`,
        { headers: { Authorization: `Bearer ${token}` } })
      this.setState({
        favorites: data.data.favorites
      })
      if (data.data.favorites.includes(city)) {
        this.setState({
          isInFavs: true
        })
      }
      console.log(data.data.favorites);
    } catch (error) {
      console.log('error', error);
    }
  }

  async addToFavs(city) {
    const token = localStorage.getItem('weatherize-token');
    const user = localStorage.getItem('weatherize-username');
    console.log('adding to favs:', city);
    try {
      const data = await axios.post(`https://weatherize-app.herokuapp.com/users/${user}/${city}`,
        { headers: { Authorization: `Bearer ${token}` } })
      console.log('add confirmation:', data);
      // this.getFavs();
      this.props.refreshFavs();
    } catch (error) {
      console.log('error', error);
    }
  }

  async removeFromFavs(city) {
    console.log('removing from favs:', city);
    const token = localStorage.getItem('weatherize-token');
    const user = localStorage.getItem('weatherize-username');
    try {
      const data = await axios.delete(`https://weatherize-app.herokuapp.com/users/${user}/${city}`,
        { headers: { Authorization: `Bearer ${token}` } })
      console.log('remove confirmation:', data);
      // this.getFavs();
      this.props.refreshFavs();
    } catch (error) {
      console.log('error', error);
    }
    // this.getFavs(city);
  }

  render() {

    return (
      <div className='favs'>
        {this.state.location && this.state.isInFavs &&
          <div className='current-location-card'>
            <div className='card-header'>
              <h2 className="location">{this.state.location}, <span>{this.state.country}</span></h2>
              {this.state.isInFavs ?
                <svg
                  onClick={() => {
                    this.setState({ isInFavs: false })
                    this.removeFromFavs(this.state.location);
                  }}
                  width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1C3.6868 1 1 3.6592 1 6.94C1 9.5884 2.05 15.874 12.3856 22.228C12.5707 22.3406 12.7833 22.4002 13 22.4002C13.2167 22.4002 13.4293 22.3406 13.6144 22.228C23.95 15.874 25 9.5884 25 6.94C25 3.6592 22.3132 1 19 1C15.6868 1 13 4.6 13 4.6C13 4.6 10.3132 1 7 1Z" fill="#A3A3A3" stroke="#A3A3A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                :
                <svg
                  onClick={() => {
                    this.setState({ isInFavs: true })
                    this.addToFavs(this.state.location);
                  }}
                  width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1C3.6868 1 1 3.6592 1 6.94C1 9.5884 2.05 15.874 12.3856 22.228C12.5707 22.3406 12.7833 22.4002 13 22.4002C13.2167 22.4002 13.4293 22.3406 13.6144 22.228C23.95 15.874 25 9.5884 25 6.94C25 3.6592 22.3132 1 19 1C15.6868 1 13 4.6 13 4.6C13 4.6 10.3132 1 7 1Z" stroke="#A3A3A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              }
            </div>
            <ul>
              <li className="temperature">{this.state.temperature} C°</li>
              <li className='sky'>{this.state.sky}</li>
              <li>{this.state.feelsLike} C°<span>feels like</span></li>
              <li>{this.state.tempMin} C°<span>min</span></li>
              <li>{this.state.tempMax} C°<span>max</span></li>
              <li>{this.state.windSpeed} m/s {this.state.windDirection}<span>wind</span></li>
            </ul>
            <Link to={{
              pathname: `/${this.state.location}`
            }}>
              <p className='more'>more</p>
            </Link>
          </div>
        }
        {!this.state.isInFavs &&
          <div></div>
        }
      </div >
    )
  }

}