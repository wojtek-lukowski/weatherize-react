import { CurrentLocationCard } from "./CurrentLocationCard";
import { LocationCard } from "./LocationCard";
import { useState, useEffect } from 'react';
import { BrowserRouter, Router, Routes, Link } from 'react-router-dom';
import { config } from './config';
import Favorites from './Favorites';
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
const key = config.API_KEY;

function Dashboard(props) {

  const [user, setUser] = useState(null);

  console.log('dashboard props', props);

  useEffect(() => {
    const usernameStorage = localStorage.getItem('weatherize-username')
    const tokenStorage = localStorage.getItem('weatherize-token')
    console.log('retrieved', usernameStorage, tokenStorage);
    setUser(usernameStorage);
    // setUser(props.user);
  })

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('weatherize-username')
    localStorage.removeItem('weatherize-token')
    window.open('/', '_self');
  }

  // const user = props.user

  return (

    <div className="App content">
      <Link to='/hourly' className="card">
        <CurrentLocationCard />
      </Link>
      <br></br>
      {user &&
        <Favorites user={props.user} token={props.token} />
      }
      {user ?
        <nav>
          <Link to='/'>
            <button className='button-primary' onClick={logOut}>Log out</button>
          </Link>
        </nav> :
        <nav>
          <Link to='/login'>
            <button className='button-primary'>Login</button>
          </Link>
          <Link to='/register'>
            <button className='button-primary'>Create Account
            </button>
          </Link>
        </nav>
      }
    </div >
  );
}

export default Dashboard;
