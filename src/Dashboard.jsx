import { CurrentLocationCard } from "./CurrentLocationCard";
import { LocationCard } from "./LocationCard";
import { useState, useEffect } from 'react';
import { BrowserRouter, Router, Routes, Link } from 'react-router-dom';
import { config } from './config';
import Favorites from './Favorites';
const key = config.API_KEY;

function Dashboard(props) {

  const [user, setUser] = useState('null');

  return (

    <div className="App content">
      <Link to='/hourly' className="card">
        <CurrentLocationCard />
      </Link>
      <br></br>
      {props.user &&
        <Favorites user={props.user} token={props.token} />
      }
      <nav>
        <Link to='/login'>
          <button className='button-primary'>Login</button>
        </Link>

        <Link to='/register'>
          <button className='button-primary'>Create Account
          </button>
        </Link>
      </nav>
    </div>
  );
}

export default Dashboard;
