import React from 'react';
import { Link } from 'react-router-dom';
import { config } from './config';
import { Chart } from 'react-google-charts';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, Bar, BarChart, ComposedChart } from 'recharts';
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
      console.log(data);

      //setting up hourly cards
      let preaparingHourlyCards = [];

      const hours24 = [];
      for (let i = 0; i < 24; i++) {
        hours24.push(i);
      }

      const hours48 = hours24.concat(hours24);

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

        card.time = currentTimeArray[i];
        card.temperature = (data.hourly[i].temp - 273.15).toFixed(1);
        card.feelsLike = (data.hourly[i].feels_like - 273.15).toFixed(1);
        card.sky = data.hourly[i].weather[0].main;
        card.windSpeed = data.hourly[i].wind_speed.toFixed(1);
        card.windGusts = data.hourly[i].wind_gust.toFixed(1);

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
          temperatureMax: '',
          temperatureMin: '',
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
        card.temperatureMax = (data.daily[i].temp.max - 273.15).toFixed(1);
        card.temperatureMin = (data.daily[i].temp.min - 273.15).toFixed(1);
        card.sky = data.daily[i].weather[0].main;
        card.windSpeed = data.daily[i].wind_speed.toFixed(1);
        card.windGusts = data.daily[i].wind_gust.toFixed(1);
        card.precProb = data.daily[i].pop;

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
      this.setState({
        rainIn
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

  //setting up data for hourly charts
  //temperature & feels like hourly
  getTempChartHourly = () => {
    const tempChartHourly = [];
    for (let i = 0; i < this.state.hourlyCards.length; i++) {
      tempChartHourly.push({
        time: this.state.hourlyCards[i].time.toString(),
        temperature: parseInt(this.state.hourlyCards[i].temperature),
        feelsLike: parseInt(this.state.hourlyCards[i].feelsLike)
      }
      )
    }
    return tempChartHourly
  }

  //wind & wind gusts hourly
  getWindChartHourly = () => {
    const windChartHourly = [];
    for (let i = 0; i < this.state.hourlyCards.length; i++) {
      windChartHourly.push({
        time: this.state.hourlyCards[i].time.toString(),
        wind: parseInt(this.state.hourlyCards[i].windSpeed),
        windGusts: parseInt(this.state.hourlyCards[i].windGusts)
      })
    }
    return windChartHourly
  }

  //humidity & pressure
  getHumidityAndPressureChartHourly = () => {
    const humidityAndPressureChartHourly = [];
    for (let i = 0; i < this.state.hourlyCards.length; i++) {
      humidityAndPressureChartHourly.push({
        time: this.state.hourlyCards[i].time.toString(),
        humidity: parseInt(this.state.hourlyCards[i].humidity),
        pressure: parseInt(this.state.hourlyCards[i].pressure)
      })
    }
    return humidityAndPressureChartHourly
  }


  //setting up data for daily charts
  //temperature range  + temp & feel daily
  getAllTempDaily = () => {
    const allTempDaily = [];
    for (let i = 0; i < this.state.dailyCards.length; i++) {
      allTempDaily.push({
        time: this.state.dailyCards[i].time,
        temperature: parseInt(this.state.dailyCards[i].temperature),
        feelsLike: parseInt(this.state.dailyCards[i].feelsLike),
        range: [
          parseInt(this.state.dailyCards[i].temperatureMin),
          parseInt(this.state.dailyCards[i].temperatureMax)
        ]
      })
    }
    return allTempDaily
  }

  //humidity & pressure daily
  getHumidityAndPressureChartDaily = () => {
    const humidityAndPressureChartDaily = [];
    for (let i = 0; i < this.state.dailyCards.length; i++) {
      humidityAndPressureChartDaily.push({
        time: this.state.dailyCards[i].time,
        humidity: parseInt(this.state.dailyCards[i].humidity),
        pressure: parseInt(this.state.dailyCards[i].pressure)
      })
    }
    return humidityAndPressureChartDaily
  }

  //wind & wind gusts daily
  getWindChartDaily = () => {
    const windChartDaily = [];
    for (let i = 0; i < this.state.dailyCards.length; i++) {
      windChartDaily.push({
        time: this.state.dailyCards[i].time,
        wind: parseInt(this.state.dailyCards[i].windSpeed),
        windGusts: parseInt(this.state.dailyCards[i].windGusts)
      })
    }
    return windChartDaily
  }

  //precipitation probability daily chart
  getPrecipProbChart = () => {
    const precipProbChart = [];
    for (let i = 0; i < this.state.dailyCards.length; i++) {
      precipProbChart.push({
        time: this.state.dailyCards[i].time,
        probability: this.state.dailyCards[i].precProb * 100
      });
    }
    return precipProbChart
  }

  render() {
    // console.log('state hourly cards', this.state.hourlyCards);
    // console.log('state daily cards', this.state.dailyCards);
    // console.log('state minutely cards', this.state.minutelyCards);
    // console.log('rain', this.state.hourlyCards.precipitation.findIndex(1))
    // console.log('h/d', this.state.hourly)
    // console.log('rainIn', this.state.rainIn);
    // console.log(this.state.skyChartDaily);
    // console.log(this.state.tempChartHourly);
    // console.log(this.state.dailyCards[0].time.toString());


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
                  <p>Temperature & feel</p>
                  <ResponsiveContainer
                    width='100%'
                    height={250}>
                    <LineChart
                      chartType="LineChart"
                      width={600}
                      height={250}
                      // data={this.state.tempChartHourly}
                      data={this.getTempChartHourly()}
                    >
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Legend
                        layout='vertical'
                        align='center'
                        verticalAlign='top'
                      />
                      <Tooltip />
                      <Line type="monotone"
                        dataKey="temperature"
                        stroke="var(--primary-color)"
                        dot={false}
                      />
                      <Line type="monotone"
                        dataKey="feelsLike"
                        stroke="var(--text-color)"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <p>Wind & wind gusts</p>
                  <ResponsiveContainer
                    width='100%'
                    height={250}>
                    <LineChart
                      chartType="LineChart"
                      width={600}
                      height={250}
                      data={this.getWindChartHourly()}
                    >
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Legend
                        layout='vertical'
                        align='center'
                        verticalAlign='top'
                      />
                      <Tooltip />
                      <Line type="monotone"
                        dataKey="wind"
                        stroke="var(--primary-color)"
                        dot={false}
                      />
                      <Line type="monotone"
                        dataKey="windGusts"
                        stroke="var(--text-color)"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <p>Pressure & humidity</p>
                  <ResponsiveContainer
                    width='100%'
                    height={250}>
                    <LineChart
                      chartType="LineChart"
                      width={600}
                      height={250}
                      data={this.getHumidityAndPressureChartHourly()}
                    >
                      <XAxis dataKey="time" />
                      <YAxis yAxisId="left"
                        domain={[900, 1090]}
                      />
                      <YAxis yAxisId="right"
                        orientation="right" />
                      <Legend
                        layout='vertical'
                        align='center'
                        verticalAlign='top'
                      />
                      <Tooltip />
                      <Line type="monotone"
                        dataKey="pressure"
                        stroke="var(--primary-color)"
                        dot={false}
                        yAxisId="left"
                      />
                      <Line type="monotone"
                        dataKey="humidity"
                        stroke="var(--text-color)"
                        dot={false}
                        yAxisId="right"
                      />
                    </LineChart>
                  </ResponsiveContainer>
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
                    <li>Max</li>
                    <li>Min</li>
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
                        <li>{this.state.dailyCards[index].temperatureMax} C°</li>
                        <li>{this.state.dailyCards[index].temperatureMin} C°</li>
                      </ul>
                    )}
                  </div>
                </div>
                <div className='charts'>
                  <p>Daily temperature range, average & feel</p>
                  <ResponsiveContainer
                    width='100%'
                    height={250}>
                    <ComposedChart width={730} height={250} data={this.getAllTempDaily()}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend
                        layout='vertical'
                        align='center'
                        verticalAlign='top'
                      />
                      <Tooltip />
                      <Bar dataKey="range" fill="var(--card-background)" />
                      <Line type="monotone"
                        dataKey="temperature"
                        stroke="var(--primary-color)"
                        dot={false}
                      />
                      <Line type="monotone"
                        dataKey="feelsLike"
                        stroke="var(--text-color)"
                        dot={false}
                      />
                      {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                    </ComposedChart>
                  </ResponsiveContainer>

                  <p>Precipitation probability</p>
                  <ResponsiveContainer
                    width='100%'
                    height={250}>
                    <BarChart width={600} height={250} data={this.getPrecipProbChart()}>
                      <Bar dataKey="probability" fill="var(--primary-color)" background={{ fill: 'var(--card-background)' }} />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      {/* <Legend
                        layout='vertical'
                        align='center'
                        verticalAlign='top'
                      /> */}
                    </BarChart>
                  </ResponsiveContainer>

                  <p>Pressure & humidity</p>
                  <ResponsiveContainer
                    width='100%'
                    height={250}>
                    <LineChart
                      chartType="LineChart"
                      width={600}
                      height={250}
                      data={this.getHumidityAndPressureChartDaily()}
                    >
                      <XAxis dataKey="time" />
                      <YAxis yAxisId="left"
                        domain={[900, 1090]}
                      />
                      <YAxis yAxisId="right"
                        orientation="right" />
                      <Legend
                        layout='vertical'
                        align='center'
                        verticalAlign='top'
                      />
                      <Tooltip />
                      <Line type="monotone"
                        dataKey="pressure"
                        stroke="var(--primary-color)"
                        dot={false}
                        yAxisId="left"
                      />
                      <Line type="monotone"
                        dataKey="humidity"
                        stroke="var(--text-color)"
                        dot={false}
                        yAxisId="right"
                      />
                    </LineChart>
                  </ResponsiveContainer>

                  <p>Wind & wind gusts</p>
                  <ResponsiveContainer
                    width='100%'
                    height={250}>
                    <LineChart
                      chartType="LineChart"
                      width={600}
                      height={250}
                      data={this.getWindChartDaily()}
                    >
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Legend
                        layout='vertical'
                        align='center'
                        verticalAlign='top'
                      />
                      <Tooltip />
                      <Line type="monotone"
                        dataKey="wind"
                        stroke="var(--primary-color)"
                        dot={false}
                      />
                      <Line type="monotone"
                        dataKey="windGusts"
                        stroke="var(--text-color)"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}