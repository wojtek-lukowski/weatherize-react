import { CurrentLocationCard } from "./CurrentLocationCard";
import { LocationCard } from "./LocationCard";
import { useState, useEffect } from 'react';
import { BrowserRouter, Router, Routes, Link } from 'react-router-dom';
import { config } from './config';
const key = config.API_KEY;

function Dashboard() {

  const [favorites, setFavorites] = useState(['Warszawa', 'Tokyo', 'Singapore', 'Sevilla']);

  return (

    // <div>
    //   <CurrentLocationCard />
    // </div>
    <div className="App">
      {/* <Link> */}
      <CurrentLocationCard />
      {/* </Link> */}
      <br></br>
      <div>Favorites:
        {favorites.map(city =>
          <div key={city}>
            <LocationCard city={city} />
            <br></br>
          </div>
        )}
      </div>
      <nav>
        <Link to='/login'>Login</Link>
      </nav>
    </div>
  );
}

export default Dashboard;
