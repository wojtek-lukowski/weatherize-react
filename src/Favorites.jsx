import { CurrentLocationCard } from "./CurrentLocationCard";
import { LocationCard } from "./LocationCard";
import { useState, useEffect } from 'react';
import { BrowserRouter, Router, Routes, Link } from 'react-router-dom';
import { config } from './config';
const key = config.API_KEY;

function Favorites() {

  const [favorites, setFavorites] = useState(['Warszawa', 'Tokyo', 'Singapore', 'Malaga']);

  return (
    <div>Favorites:
      {favorites.map(city =>
        <div key={city}>
          <LocationCard city={city} />
          <br></br>
        </div>
      )}
    </div>
  );
}

export default Favorites;
