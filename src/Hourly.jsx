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
      hourlyCards: [],
      dailyCards: [],
      minutelyCards: []
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
      console.clear();
      console.log(data);
      console.log('data.daily', data.daily);
      console.log('data.hourly', data.hourly);
      console.log('data.minutely', data.minutely);
      // console.log(data.daily);

      //setting up hourly cards
      let preaparingHourlyCards = [];

      for (let i = 0; i < data.hourly.length; i++) {

        let card = {
          time: '',
          temperature: ''
        };

        card.time = new Date(data.hourly[i].dt).toLocaleTimeString();
        card.temperature = ((data.hourly[i].temp - 273.15).toFixed(1));
        preaparingHourlyCards.push(card);
      }

      this.setState({
        hourlyCards: preaparingHourlyCards
      })

      //setting up daily cards
      let preaparingDailyCards = [];

      const day = new Date();
      console.log('day', day.getDay()); //index of days for today
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      let indexOfToday = day.getDay();
      const copy = [...days];
      const part1 = copy.splice(indexOfToday).concat(days);
      console.log('part 1', part1);
      const final = [...new Set(part1)];
      console.log(final);

      for (let i = 0; i < data.daily.length; i++) {

        let card = {
          time: '',
          temperature: ''
        };

        card.time = final[i];
        card.temperature = ((data.daily[i].temp.day - 273.15).toFixed(1));
        preaparingDailyCards.push(card);
      }

      this.setState({
        dailyCards: preaparingDailyCards
      })

      const rainIn = this.state.minutelyCards.findIndex(time => { return time.precipitation === 0 });
      const rainArray = this.state.minutelyCards.filter(time => { return (time.precipitation === 0) });
      console.log('find index of rain minute', rainIn);
      console.log('rain minutes array', rainArray);

      //setting up minute cards
      let preaparingMinuteCards = [];

      for (let i = 0; i < data.minutely.length; i++) {

        let card = {
          time: '',
          precipitation: ''
        };

        card.time = new Date(data.minutely[i].dt).toLocaleTimeString();
        card.precipitation = data.minutely[i].precipitation;
        preaparingMinuteCards.push(card);
      }

      this.setState({
        minutelyCards: preaparingMinuteCards
      })

    } catch (err) {
      console.log(err);
    }
  };

  render() {
    console.log('state hourly cards', this.state.hourlyCards);
    console.log('state daily cards', this.state.dailyCards);
    console.log('state minutely cards', this.state.minutelyCards);


    // console.log('rain', this.state.hourlyCards.precipitation.findIndex(1))

    return (
      <div>
        <div>Your current location:</div>
        {this.state.location &&
          <div className="">
            <div className="bold">{this.state.location}, {this.state.country}</div>
            <div> <div>hourly:</div>
              {(this.state.hourlyCards).map((hour, index) =>
                <div key={index}>{this.state.hourlyCards[index].time}, {this.state.hourlyCards[index].temperature}</div>
              )}
            </div>
            <div><div>daily:</div>
              {(this.state.dailyCards).map((day, index) =>
                <div key={index}>{this.state.dailyCards[index].time}, {this.state.dailyCards[index].temperature}</div>
              )}
            </div>
            {/* <div>
              {this.state.hourlyCards.includes(1) &&
                <div>Rain in: {this.state.hourlyCards.findIndex(1)}
                </div>
              }
            </div> */}
          </div>
        }
      </div>
    )
  }
}