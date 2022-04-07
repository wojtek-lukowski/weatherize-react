import { CurrentLocationCard } from "./CurrentLocationCard";
import { LocationCard } from "./LocationCard";
import { useState, useEffect } from 'react';
import { BrowserRouter, Router, Routes, Link } from 'react-router-dom';
import { config } from './config';
import Favorites from './Favorites';
const key = config.API_KEY;

function Dashboard() {

  const [user, setUser] = useState(null);

  return (

    // <div>
    //   <CurrentLocationCard />
    // </div>
    <div className="App">
      <Link to='/hourly' className="card">
        <CurrentLocationCard />
      </Link>
      <br></br>
      {user &&
        <Favorites />
      }
      <nav>
        <Link to='/login'>Login</Link>
        <br></br>
        <Link to='/register'>Create Account</Link>
      </nav>
    </div>
  );
}

export default Dashboard;
