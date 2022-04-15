import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { config } from './config';
import { Chart } from 'react-google-charts';
const key = config.API_KEY;


export class Hourly extends React.Component {

  constructor() {
    super();

    this.state = {
      location: '',
      country: '',
      hourlyCards: [],
      dailyCards: [],
      minutelyCards: [],
      rainIn: null,
      hourly: true,
      tempChartHourly: [],
      tempChartHourlyOptions:
      {
        title: "Hourly temperature",
        curveType: "function",
        legend: { position: "bottom" }
      },
      windChartHourly: [],
      windChartHourlyOptions:
      {
        title: "Wind & wind gusts",
        curveType: "function",
        legend: { position: "bottom" }
      },
      tempChartDaily: [],
      tempChartDailyOptions:
      {
        chart: {
          title: "Daily temperature",
          subtitle: "Dfferences during the day"
        }
      },
      skyChartDaily: [],
      skyChartDailyOptions:
      {
        title: "Sky in the next 8 days",
      },
      precipProbChart: [],
      precipProbChartOptions:
      {
        title: "Precipitation probability",
        redFrom: 90,
        redTo: 100,
        yellowFrom: 75,
        yellowTo: 90,
      },
    }
  }

  async componentDidMount() {
    console.clear();
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
      // console.clear();
      console.log(data);
      // console.log('data.daily', data.daily);
      // console.log('data.hourly', data.hourly);
      // console.log('data.minutely', data.minutely);
      // console.log(data.daily);

      //setting up hourly cards
      let preaparingHourlyCards = [];

      const hours24 = [];
      for (let i = 0; i < 24; i++) {
        hours24.push(i);
      }

      const hours48 = hours24.concat(hours24);

      // console.log('hours48', hours48);

      let timeNow = new Date();
      timeNow = timeNow.toLocaleTimeString().split('');
      timeNow = timeNow.splice(0, 2).join('');
      timeNow = parseInt(timeNow);
      timeNow = timeNow + 1;
      // console.log('timeNow', timeNow, typeof timeNow);

      const hours48Copy = [...hours48];
      const currentTimeArray = hours48Copy.splice(timeNow).concat(hours48).splice(0, 48);
      // currentTimeArray[0] = 'Now';

      for (let i = 0; i < data.hourly.length; i++) {

        let card = {
          time: '',
          temperature: '',
          sky: '',
          windSpeed: '',
          windDirection: '',
          windGusts: '',
          feelsLike: '',
          pressure: '',
          humidity: '',
        };

        // card.time = new Date(data.hourly[i].dt).toLocaleTimeString();
        card.time = currentTimeArray[i];
        card.temperature = (data.hourly[i].temp - 273.15).toFixed(1);
        card.feelsLike = (data.hourly[i].feels_like - 273.15).toFixed(1);
        card.sky = data.hourly[i].weather[0].main;
        card.windSpeed = data.hourly[i].wind_speed.toFixed(1);
        card.windGusts = data.hourly[i].wind_gust.toFixed(1);
        // card.windDirection = data.hourly[i].wind_deg;

        let windD = data.hourly[i].wind_deg;

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

        card.windDirection = windD;

        card.pressure = data.hourly[i].pressure;
        card.humidity = data.hourly[i].humidity;
        preaparingHourlyCards.push(card);
      }

      this.setState({
        hourlyCards: preaparingHourlyCards
      })

      //setting up data for hourly charts
      const tempChartHourly = [['Time', 'Temperature', 'Feels like']];
      for (let i = 0; i < this.state.hourlyCards.length; i++) {
        tempChartHourly.push([
          this.state.hourlyCards[i].time,
          parseInt(this.state.hourlyCards[i].temperature),
          parseInt(this.state.hourlyCards[i].feelsLike)
        ])
      }
      this.setState({
        tempChartHourly
      })

      const windChartHourly = [['Time', 'Wind Speed', 'Wind Gusts']];
      for (let i = 0; i < this.state.hourlyCards.length; i++) {
        windChartHourly.push([
          this.state.hourlyCards[i].time.toString(),
          parseInt(this.state.hourlyCards[i].windSpeed),
          parseInt(this.state.hourlyCards[i].windGusts)
        ])
      }
      this.setState({
        windChartHourly
      })

      //setting up daily cards
      let preaparingDailyCards = [];

      const day = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      let indexOfToday = day.getDay();
      indexOfToday = indexOfToday + 1;
      const copy = [...days];
      const part1 = copy.splice(indexOfToday).concat(days);
      // part1[0] = 'Today';

      for (let i = 0; i < data.daily.length; i++) {

        let card = {
          time: '',
          temperature: '',
          temperatureMorning: '',
          temperatureEvening: '',
          temperatureNight: '',
          feelsLikeMorning: '',
          feelsLikeEveneing: '',
          feelsLikeNight: '',
          sky: '',
          windSpeed: '',
          windDirection: '',
          windGusts: '',
          feelsLike: '',
          pressure: '',
          humidity: '',
          precProb: ''
        };

        card.time = part1[i];
        card.temperature = (data.daily[i].temp.day - 273.15).toFixed(1);
        card.feelsLike = (data.daily[i].feels_like.day - 273.15).toFixed(1);
        card.feelsLikeMorning = (data.daily[i].feels_like.morn - 273.15).toFixed(1);
        card.feelsLikeEvening = (data.daily[i].feels_like.eve - 273.15).toFixed(1);
        card.feelsLikeNight = (data.daily[i].feels_like.night - 273.15).toFixed(1);
        card.temperatureMorning = (data.daily[i].temp.morn - 273.15).toFixed(1);
        card.temperatureEvening = (data.daily[i].temp.eve - 273.15).toFixed(1);
        card.temperatureNight = (data.daily[i].temp.night - 273.15).toFixed(1);
        card.sky = data.daily[i].weather[0].main;
        card.windSpeed = data.daily[i].wind_speed.toFixed(1);
        card.windGusts = data.daily[i].wind_gust.toFixed(1);
        card.precProb = data.daily[i].pop;
        // card.windDirection = data.daily[i].wind_deg;
        let windD = data.hourly[i].wind_deg;

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

        card.windDirection = windD;
        card.pressure = data.daily[i].pressure;
        card.humidity = data.daily[i].humidity;
        preaparingDailyCards.push(card);
      }

      this.setState({
        dailyCards: preaparingDailyCards
      })

      const rainIn = this.state.minutelyCards.findIndex(time => { return time.precipitation === 0 });
      // const rainArray = this.state.minutelyCards.filter(time => { return time.precipitation === 0 });
      this.setState({
        rainIn
      })

      //setting up data for daily charts
      const tempChartDaily = [['Day', 'Morning', 'Midday', 'Evening', 'Night']];
      for (let i = 0; i < this.state.dailyCards.length; i++) {
        tempChartDaily.push([
          this.state.dailyCards[i].time,
          parseInt(this.state.dailyCards[i].temperatureMorning),
          parseInt(this.state.dailyCards[i].temperature),
          parseInt(this.state.dailyCards[i].temperatureEvening),
          parseInt(this.state.dailyCards[i].temperatureNight),
        ])
      }
      this.setState({
        tempChartDaily
      })

      const skyChartDaily = [['Sky', 'Number of Days']];
      const skyTypes = [];
      for (let i = 0; i < this.state.dailyCards.length; i++) {
        skyTypes.push(this.state.dailyCards[i].sky)
      }
      const skyTypecounts = {};
      skyTypes.forEach((x) => {
        skyTypecounts[x] = (skyTypecounts[x] || 0) + 1;
      });
      const skyTypesArray = (Object.keys(skyTypecounts));
      const skyTypesNumbers = (Object.values(skyTypecounts));

      for (let i = 0; i < skyTypesArray.length; i++) {
        skyChartDaily.push([skyTypesArray[i], skyTypesNumbers[i]]);
      }

      this.setState({
        skyChartDaily
      })

      const precipProbChart = [['Day', 'Precipitation probability']];

      for (let i = 0; i < this.state.dailyCards.length; i++) {
        precipProbChart.push([this.state.dailyCards[i].time, this.state.dailyCards[i].precProb * 100]);
      }

      this.setState({
        precipProbChart
      })

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

  toggleHourly = () => {
    if (this.state.hourly) {
      this.setState({
        hourly: false,
      })
    } else {
      this.setState({
        hourly: true,
      })
    }
  }

  render() {
    // console.log('state hourly cards', this.state.hourlyCards);
    // console.log('state daily cards', this.state.dailyCards);
    // console.log('state minutely cards', this.state.minutelyCards);
    // console.log('rain', this.state.hourlyCards.precipitation.findIndex(1))
    // console.log('h/d', this.state.hourly)
    // console.log('rainIn', this.state.rainIn);
    // console.log(this.state.skyChartDaily);


    return (
      <div className='content'>
        <div className='back-button-container'>
          <Link to='/'>
            <button className='button-primary'>Home</button>
          </Link>
        </div>
        <div className='hourly-header'>
          {/* <div className='grey'>Your current location</div> */}
          <h2 className="location">{this.state.location}, <span>{this.state.country}</span></h2>
        </div>
        {this.state.location &&
          <div className='hourly-data'>
            {this.state.hourly ?
              <div>
                <button className="button-toggle-selected" onClick={this.toggleHourly}>Hourly</button>
                <button className="button-toggle" onClick={this.toggleHourly}>Daily</button>
              </div>
              :
              <div>
                <button className="button-toggle" onClick={this.toggleHourly}>Hourly</button>
                <button className="button-toggle-selected" onClick={this.toggleHourly}>Daily</button>
              </div>
            }
            {this.state.hourly ?
              <div>
                <div className='hourly-cards-container'>
                  <ul className="hourly-card">
                    <li>Time</li>
                    <li>Temp</li>
                    <li>Feels like</li>
                    <li>Sky</li>
                    <li>Wind (m/s)</li>
                    <li>Wind (dir)</li>
                    <li>Wind gusts</li>
                    <li>Pressure</li>
                    <li>Humidity</li>
                  </ul>
                  <div className='hourly-cards-moving'>
                    {(this.state.hourlyCards).map((hour, index) =>
                      <ul className="hourly-card" key={index}>
                        <li>{this.state.hourlyCards[index].time}:00</li>
                        <li>{this.state.hourlyCards[index].temperature} C°</li>
                        <li>{this.state.hourlyCards[index].feelsLike} C°</li>
                        <li>{this.state.hourlyCards[index].sky}</li>
                        <li>{this.state.hourlyCards[index].windSpeed}</li>
                        <li>{this.state.hourlyCards[index].windDirection}</li>
                        <li>{this.state.hourlyCards[index].windGusts}</li>
                        <li>{this.state.hourlyCards[index].pressure} hPa</li>
                        <li>{this.state.hourlyCards[index].humidity}%</li>
                      </ul>
                    )}
                  </div>
                </div>
                <div className='rain-info'>
                  {this.state.rainIn > 0 ?
                    <div className='green'>Rain in {this.state.rainIn} mins
                    </div> :
                    <div>No rain in the next hour</div>
                  }
                </div>
                <div className='charts'>
                  <Chart
                    chartType="LineChart"
                    width="100%"
                    data={this.state.tempChartHourly}
                    options={this.state.tempChartHourlyOptions}
                  />
                  <Chart
                    chartType="LineChart"
                    width="100%"
                    data={this.state.windChartHourly}
                    options={this.state.windChartHourlyOptions}
                  />
                </div>
              </div>
              :
              <div>
                <div className='hourly-cards-container'>
                  <ul className="hourly-card">
                    <li>Day</li>
                    <li>Temp</li>
                    <li>Feels like</li>
                    <li>Sky</li>
                    <li>Wind (m/s)</li>
                    <li>Wind (dir)</li>
                    <li>Wind gusts</li>
                    <li>Pressure</li>
                    <li>Humidity</li>
                    <li>Morning</li>
                    <li>Feels like</li>
                    <li>Evening</li>
                    <li>Feels like</li>
                    <li>Night</li>
                    <li>Feels like</li>
                  </ul>
                  <div className='hourly-cards-moving'>
                    {(this.state.dailyCards).map((day, index) =>
                      <ul className='hourly-card' key={index}>
                        <li>{this.state.dailyCards[index].time}</li>
                        <li>{this.state.dailyCards[index].temperature} C°</li>
                        <li>{this.state.dailyCards[index].feelsLike} C°</li>
                        <li>{this.state.dailyCards[index].sky}</li>
                        <li>{this.state.dailyCards[index].windSpeed}</li>
                        <li>{this.state.dailyCards[index].windDirection}</li>
                        <li>{this.state.dailyCards[index].windGusts}</li>
                        <li>{this.state.dailyCards[index].pressure} hPa</li>
                        <li>{this.state.dailyCards[index].humidity}%</li>
                        <li>{this.state.dailyCards[index].temperatureMorning} C°</li>
                        <li>{this.state.dailyCards[index].feelsLikeMorning} C°</li>
                        <li>{this.state.dailyCards[index].temperatureEvening} C°</li>
                        <li>{this.state.dailyCards[index].feelsLikeEvening} C°</li>
                        <li>{this.state.dailyCards[index].temperatureNight} C°</li>
                        <li>{this.state.dailyCards[index].feelsLikeNight} C°</li>
                      </ul>
                    )}
                  </div>
                </div>
                <div className='charts'>
                  <Chart
                    chartType="Bar"
                    width="100%"
                    data={this.state.tempChartDaily}
                    options={this.state.tempChartDailyOptions}
                  />
                  <Chart
                    chartType="PieChart"
                    width="100%"
                    data={this.state.skyChartDaily}
                    options={this.state.skyChartDailyOptions}
                  />
                  <p>Precipitation probability</p>
                  <Chart
                    chartType="Gauge"
                    width="100%"
                    data={this.state.precipProbChart}
                    options={this.state.precipProbChartOptions}
                  />
                </div>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}