import React from 'react';
import { config } from './config';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import axios from 'axios';
const key = config.API_KEY;
export class CurrentLocationCard extends React.Component {

  constructor() {
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
      loading: true,
      isInFavs: false,
      favsManipulation: false
      // favorites: []
    }
  }

  async componentDidMount() {
    console.log('current init favs', this.state.favorites);
    console.log('current init props favs', this.props.favorites);
    // this.setState({ favorites: this.props.favorites })
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getWeather(position.coords.latitude, position.coords.longitude);
        localStorage.setItem('latitude', position.coords.latitude);
        localStorage.setItem('longitude', position.coords.longitude);
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getWeather(lat, lng) {
    try {
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`;
      const data = await (await fetch(api)).json();
      console.log(data);
      this.getFavs(data.name);
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

      localStorage.setItem('location', data.name);
      localStorage.setItem('country', data.sys.country);
    } catch (err) {
      console.log(err);
    }
    this.setState({
      loading: false
    })
  };

  async getFavs(city) {
    const token = localStorage.getItem('weatherize-token');
    const user = localStorage.getItem('weatherize-username');
    try {
      const data = await axios.get(`https://weatherize-app.herokuapp.com/users/${user}`,
        { headers: { Authorization: `Bearer ${token}` } })
      // this.setState({
      //   favorites: data.data.favorites
      // })
      if (data.data.favorites.includes(city)) {
        this.setState({
          isInFavs: true
        })
      }
      console.log(data.data.favorites);
    } catch (error) {
      console.log('error', error);
    }
    this.props.getFavs();
  }

  async addToFavs(city) {
    const maxFavsNumber = 5;
    this.setState({ favsManipulation: true });
    const token = localStorage.getItem('weatherize-token');
    const user = localStorage.getItem('weatherize-username');
    console.log('adding to favs:', city);
    if (this.props.favorites.length >= maxFavsNumber) {
      this.removeFromFavs(this.props.favorites[0])
    }
    try {
      const data = await axios.post(`https://weatherize-app.herokuapp.com/users/${user}/${city}`, {},
        { headers: { Authorization: `Bearer ${token}` } })
      console.log('add confirmation:', data);
      this.getFavs();
      this.setState({ favsManipulation: false });
      this.props.refreshFavs();
    } catch (error) {
      console.log('error', error);
    }
  }

  async removeFromFavs(city) {
    this.setState({ favsManipulation: true });
    console.log('removing from favs:', city);
    const token = localStorage.getItem('weatherize-token');
    const user = localStorage.getItem('weatherize-username');
    console.log(token);
    try {
      const data = await axios.delete(`https://weatherize-app.herokuapp.com/users/${user}/${city}`,
        { headers: { Authorization: `Bearer ${token}` } })
      console.log('remove confirmation:', data);
      this.getFavs();
      this.setState({ favsManipulation: false });
      this.props.refreshFavs();
    } catch (error) {
      console.log('error', error);
    }
    // this.getFavs(city);
  }

  render() {

    return (
      <div className='content'>
        {this.state.loading ?
          <Loading /> :
          <div className='grey'>Your current location</div>
        }
        {this.state.location &&
          <div className='current-location-card current'>
            <div className='card-header'>
              <h2 className="location">{this.state.location}, <span>{this.state.country}</span></h2>
              {/* {this.state.isInFavs ?
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
              } */}
              {this.state.isInFavs && !this.state.favsManipulation &&
                <svg
                  onClick={() => {
                    this.setState({ isInFavs: false })
                    this.removeFromFavs(this.state.location);
                  }} width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1C3.6868 1 1 3.6592 1 6.94C1 9.5884 2.05 15.874 12.3856 22.228C12.5707 22.3406 12.7833 22.4002 13 22.4002C13.2167 22.4002 13.4293 22.3406 13.6144 22.228C23.95 15.874 25 9.5884 25 6.94C25 3.6592 22.3132 1 19 1C15.6868 1 13 4.6 13 4.6C13 4.6 10.3132 1 7 1Z" fill="#A3A3A3" stroke="#A3A3A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              }
              {this.state.isInFavs && this.state.favsManipulation &&
                <svg className='confirmation'
                  width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1C3.6868 1 1 3.6592 1 6.94C1 9.5884 2.05 15.874 12.3856 22.228C12.5707 22.3406 12.7833 22.4002 13 22.4002C13.2167 22.4002 13.4293 22.3406 13.6144 22.228C23.95 15.874 25 9.5884 25 6.94C25 3.6592 22.3132 1 19 1C15.6868 1 13 4.6 13 4.6C13 4.6 10.3132 1 7 1Z" fill="#A3A3A3" stroke="#A3A3A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              }
              {!this.state.isInFavs && !this.state.favsManipulation &&
                <svg onClick={() => {
                  this.setState({ isInFavs: true })
                  this.addToFavs(this.state.location);
                }}
                  width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1C3.6868 1 1 3.6592 1 6.94C1 9.5884 2.05 15.874 12.3856 22.228C12.5707 22.3406 12.7833 22.4002 13 22.4002C13.2167 22.4002 13.4293 22.3406 13.6144 22.228C23.95 15.874 25 9.5884 25 6.94C25 3.6592 22.3132 1 19 1C15.6868 1 13 4.6 13 4.6C13 4.6 10.3132 1 7 1Z" stroke="#A3A3A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              }
              {!this.state.isInFavs && this.state.favsManipulation &&
                <svg className='confirmation'
                  width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1C3.6868 1 1 3.6592 1 6.94C1 9.5884 2.05 15.874 12.3856 22.228C12.5707 22.3406 12.7833 22.4002 13 22.4002C13.2167 22.4002 13.4293 22.3406 13.6144 22.228C23.95 15.874 25 9.5884 25 6.94C25 3.6592 22.3132 1 19 1C15.6868 1 13 4.6 13 4.6C13 4.6 10.3132 1 7 1Z" fill="#A3A3A3" stroke="#A3A3A3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
              pathname: `/hourly`
            }}>
              <p className='more'>more</p>
            </Link>
          </div>
        }
      </div>
    )
  }
}