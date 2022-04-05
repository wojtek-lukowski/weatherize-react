import { CurrentLocationCard } from "./CurrentLocationCard";
import { LocationCard } from "./LocationCard";
import { useState, useEffect } from 'react';
import { config } from './config';
const key = config.API_KEY;

function Dashboard() {

  const [favorites, setFavorites] = useState(['Warszawa', 'Tokyo', 'Singapore', 'Sevilla']);

  return (
    <div className="App">
      <CurrentLocationCard />
      <br></br>
      <div>Favorites:
        {favorites.map(city =>
          <div key={city}>
            <LocationCard city={city} />
            <br></br>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
