import CurrentLocationCard from "./CurrentLocationCard";
import LocationCard from "./LocationCard";
import { useState, useEffect } from 'react';
import { config } from './config';
const key = config.API_KEY;

function Dashboard() {

  const [favorites, setFavorites] = useState(['Warszawa', 'Tokyo', 'Los Angeles']);

  return (
    <div className="App">
      <CurrentLocationCard />
      <div>Favorites:
        {favorites.map(city =>
          <div key={city}>
            <LocationCard city={city} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
