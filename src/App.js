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

  const saveUser = (username, token) => {
    console.log('saving to local storage');
    localStorage.setItem('weatherize-username', username)
    localStorage.setItem('weatherize-token', token)
    setUser(username)
    setToken(token)
  }

  return (
    <div className="App">
      <h1>Weatherize</h1>
      <Router
      // basename={'/weatherize-react'}
      >
        <Routes>
      <Route exact path='/' element={ <Dashboard user={user} token={token}/> }></Route>
      <Route exact path='/hourly' element={ <Hourly /> }></Route>
      <Route exact path='/login' element={ <Login saveUser={saveUser}/> }></Route>
      <Route exact path='/register' element={ <Registration /> }></Route>
      <Route exact path='/favorite/:city' element={ <FavsHourly /> }></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;