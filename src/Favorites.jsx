import { CurrentLocationCard } from "./CurrentLocationCard";
import { LocationCard } from "./LocationCard";
import { useState, useEffect } from 'react';
import { BrowserRouter, Router, Routes, Link } from 'react-router-dom';
import { config } from './config';
import axios from 'axios';
const key = config.API_KEY;

function Favorites(props) {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('weatherize-token');
    const user = localStorage.getItem('weatherize-username');
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
            pathname: `/${city}`,
            city,
            fromFavorites: true
          }} key={city}>
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
