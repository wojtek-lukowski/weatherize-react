// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import Registration from './Registration';
import { Hourly } from './Hourly';
import { FavsHourly } from './FavsHourly';
import './App.css';

function App() {

  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  
  // useEffect(() => {
  //   const usernameStorage = localStorage.getItem('weatherize-username')
  //   const tokenStorage = localStorage.getItem('weatherize-token')
  //   // console.log('retrieved', usernameStorage, tokenStorage);
  //   setUser(username)
  //   setToken(token)
  // })

  const saveUser = (username, token) => {
    const usernameStorage = localStorage.getItem('weatherize-username')
    const tokenStorage = localStorage.getItem('weatherize-token')
    // console.log('retrieved', usernameStorage, tokenStorage);
    setUser(usernameStorage)
    setToken(tokenStorage)
  }
  
  const logOut = () => {
    setUser(null);
    setToken(null)
    localStorage.removeItem('weatherize-username')
    localStorage.removeItem('weatherize-token')
  }

  return (
    <div className="App">
      <h1>Weatherize</h1>
      {user && 
      <h4>Welcome {user}</h4>
      }
      <Router
      basename={'/weatherize-react'}
      >
        <Routes>
      <Route exact path='/' element={ <Dashboard user={user} token={token}logOut={logOut}/> }></Route>
      <Route exact path='/hourly' element={ <Hourly /> }></Route>
      <Route exact path='/login' element={ <Login saveUser={saveUser}/> }></Route>
      <Route exact path='/register' element={ <Registration /> }></Route>
      <Route exact path='/:city' element={ <FavsHourly /> }></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;