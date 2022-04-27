import { CurrentLocationCard } from "./CurrentLocationCard";
import { LocationCard } from "./LocationCard";
import { useState, useEffect } from 'react';
import { BrowserRouter, Router, Routes, Link } from 'react-router-dom';
import { config } from './config';
import axios from 'axios';
const key = config.API_KEY;

function Favorites(props) {

  console.log('favs props', props)

  const [favorites, setFavorites] = useState([]);
  // const username = 'wojtek';
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY1NDk1NDkyMzVkYWJiOGYyYmM0NmUiLCJ1c2VybmFtZSI6IndvanRlayIsInBhc3N3b3JkIjoiJDJiJDEwJGZIakdjWk9HVUd5NTBWc1E5WWZOVHVacE9rdXA3WFJqdVBTOGo2dGNvL24xWHZJT1BocFp5IiwiZW1haWwiOiJ3b2p0ZWtAZ21haWwuY29tIiwiZmF2b3JpdGVzIjpbIkhlbHNpbmtpIiwiU2luZ2Fwb3JlIiwiV2Fyc3phd2EiLCJNYWxhZ2EiXSwiX192IjowLCJpYXQiOjE2NTA4ODgzMjgsImV4cCI6MTY1MTQ5MzEyOCwic3ViIjoid29qdGVrIn0.d3HngDKgeNIdEKozkf2MGGrm8BUvgLLQWVSUnxv4sN4';

  useEffect(() => {
    const token = localStorage.getItem('weatherize-token');
    const user = localStorage.getItem('weatherize-username');
    console.log('favorites retrieved: ', user, token);
    // const user = props.user;
    // const token = props.token;
    axios.get(`https://weatherize-app.herokuapp.com/users/${user}`,
      { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        const data = response.data;
        console.log(data);
        setFavorites(data.favorites);
        // window.open('/login', '_self');
      })
      .catch(error => {
        console.log('error', error);
        // window.open('/', '_self');
      })
  }, [])

  return (
    <div>
      <p className='grey'>Favorites</p>
      <div className="favs-section">
        {favorites.map(city =>
          <Link to={{
            pathname: `/favorite/${city}`,
            city,
            fromFavorites: true
          }}>
            <LocationCard
              city={city}
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Favorites;
