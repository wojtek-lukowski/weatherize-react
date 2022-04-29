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
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const usernameStorage = localStorage.getItem('weatherize-username')
    setUser(usernameStorage);
  })

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('weatherize-username')
    localStorage.removeItem('weatherize-token')
    // window.open('/', '_self');
    window.open('//weatherize-react', '_self');
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
        // window.open('/', '_self');
        window.open('//weatherize-react', '_self');
      })
      .catch(error => {
        console.log('error', error);
        // window.open('/', '_self');
      })
  }

  const getFavs = () => {
    const token = localStorage.getItem('weatherize-token');
    const user = localStorage.getItem('weatherize-username');
    axios.get(`https://weatherize-app.herokuapp.com/users/${user}`,
      { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        setFavorites(response.data.favorites)
        console.log(response.data.favorites);
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  const getAllUsers = () => {
    const token = localStorage.getItem('weatherize-token');
    axios.get(`https://weatherize-app.herokuapp.com/users/`,
      { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        const data = response.data;
        console.log(data);
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  const refreshFavs = () => {
    console.log('refresh favs / Favorites');
    props.getFavs();
  }

  return (

    <div className="App content">
      <Search
        favorites={favorites}
        getFavs={getFavs} />
      {/* <Link to='/hourly' className="card"> */}
      <CurrentLocationCard
        favorites={favorites}
        getFavs={getFavs}
        refreshFavs={refreshFavs}
      />
      {/* </Link> */}
      {user &&
        <Favorites
          user={props.user}
          token={props.token}
          favorites={favorites}
          getFavs={getFavs} />
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
        <nav>
          <button className='button-primary' onClick={getAllUsers}>@getAllUsers</button>
          <button className='button-primary' onClick={getFavs}>@getMyFavs</button>
        </nav>
      }
    </div >
  );
}

export default Dashboard;
