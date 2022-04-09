import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { config } from './config';
const key = config.API_KEY;

export class Hourly extends React.Component {

  constructor() {
    super();

    this.state = {
      location: '',
      country: '',
      cards: []
    }
  }

  async componentDidMount() {
    try {
      const lat = localStorage.getItem('latitude');
      const lng = localStorage.getItem('longitude');
      const location = localStorage.getItem('location');
      const country = localStorage.getItem('country');
      this.setState({
        location,
        country
      })
      this.getWeather(lat, lng);
    } catch (err) {
      console.log(err);
    }
  };

  async getWeather(lat, lng) {
    try {
      const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${key}`;
      const data = await (await fetch(api)).json();
      // console.log(data);
      console.clear();
      console.log('data.hourly', data.hourly);
      // console.log(data.daily);


      let preaparingCards = [];
      const numberOfRecords = data.hourly.length;

      for (let i = 0; i < numberOfRecords; i++) {

        let card = {
          time: '',
          temperature: ''
        };

        card.time = (data.hourly[i].dt).getUTCdate();
        card.temperature = ((data.hourly[i].temp - 273.15).toFixed(1));
        preaparingCards.push(card);
      }

      this.setState({
        cards: preaparingCards
      })

    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <div>Your current location:</div>
        {this.state.location &&
          <div className="">
            <div className="bold">{this.state.location}, {this.state.country}</div>
            <div>
              {(this.state.cards).map((hour, index) =>
                <div key={index}>{this.state.cards[index].time}, {this.state.cards[index].temperature}</div>
              )}
            </div>
          </div>
        }
      </div>
    )
  }
}