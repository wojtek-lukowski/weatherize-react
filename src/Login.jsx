import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { config } from './config';
import axios from 'axios';
const key = config.API_KEY;

function Login(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  console.log(props);

  const handleLogin = (e) => {
    console.log(username, 'is loggin in');

    e.preventDefault();

    axios.post('https://weatherize-app.herokuapp.com/login/', {
      username,
      password
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(data.token);
        console.log(data.user.username);
        props.saveUser(data.user.username, data.token);
        // window.open('/', '_self');
      })
      .catch(error => {
        console.log('error', error);
        window.open('/', '_self');
      })
  }

  //test
  const getAll = () => {
    console.log('getting all users');
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

  return (
    <div>
      <h2>Log in</h2>
      <form>
        <input placeholder='Username' type='text' value={username} onChange={e => setUsername(e.target.value)}>
        </input>
        <input placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)}>
        </input>
        <button
          type='submit'
          onClick={e => handleLogin(e)}
        >Log in</button>
      </form>
      <nav>
        <Link to='/'>Home</Link>
        <br></br>
        <Link to='/register'>Create Account</Link>
      </nav>
    </div>
  );
}

export default Login;