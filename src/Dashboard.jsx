import { CurrentLocationCard } from "./CurrentLocationCard";
import { LocationCard } from "./LocationCard";
import { useState, useEffect } from 'react';
import { BrowserRouter, Router, Routes, Link } from 'react-router-dom';
import { config } from './config';
import Favorites from './Favorites';
import Search from './Search';
import axios from "axios";
const key = config.API_KEY;

function Dashboard(props) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const usernameStorage = localStorage.getItem('weatherize-username')
    // const tokenStorage = localStorage.getItem('weatherize-token')
    setUser(usernameStorage);
    // setUser(props.user);
  })

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('weatherize-username')
    localStorage.removeItem('weatherize-token')
    window.open('/', '_self');
  }

  const removeUser = () => {
    console.log('removing', user);
    const token = localStorage.getItem('weatherize-token');
    axios.delete(`https://weatherize-app.herokuapp.com/users/${user}`,
      { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        const data = response.data;
        console.log(data);
        logOut();
        alert(user + ' has been removed');
        window.open('/', '_self');
      })
      .catch(error => {
        console.log('error', error);
        // window.open('/', '_self');
      })
  }

  const printAllUsers = () => {
    const token = localStorage.getItem('weatherize-token');
    axios.get(`https://weatherize-app.herokuapp.com/users/`,
      { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        const data = response.data;
        console.log(data);
      })
      .catch(error => {
        console.log('error', error);
        // window.open('/', '_self');
      })
  }

  // const user = props.user

  return (

    <div className="App content">
      <Search />
      <Link to='/hourly' className="card">
        <CurrentLocationCard />
      </Link>
      {user &&
        <Favorites user={props.user} token={props.token} />
      }
      {user ?
        <nav>
          <Link to='/'>
            <button className='button-primary' onClick={logOut}>Log out</button>
          </Link>
          <button className='button-primary remove' onClick={removeUser}>Delete account</button>
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
      {user == 'wojtek' &&
        <button className='button-primary' onClick={printAllUsers}>Admin</button>
      }
    </div >
  );
}

export default Dashboard;
