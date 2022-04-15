import { CurrentLocationCard } from "./CurrentLocationCard";
import { LocationCard } from "./LocationCard";
import { useState, useEffect } from 'react';
import { BrowserRouter, Router, Routes, Link } from 'react-router-dom';
import { config } from './config';
const key = config.API_KEY;

function Favorites() {

  const [favorites, setFavorites] = useState(['Warszawa', 'Tokyo', 'Singapore', 'Malaga']);

  return (
    <div className="favs">
      <p className='grey'>Favorites</p>
      {favorites.map(city =>
        <div key={city}>
          <Link to={{
            pathname: `/favorite/${city}`,
            city
          }}>
            <LocationCard city={city} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Favorites;
