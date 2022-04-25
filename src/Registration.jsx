import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { config } from './config';
import axios from 'axios';
const key = config.API_KEY;

function Registration() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = (e) => {
    console.log(e, 'e')
    console.log(username, 'creating account')
    e.preventDefault();

    axios.post('https://weatherize-app.herokuapp.com/users', {
      username,
      password,
      email
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        // window.open('/login', '_self');
      })
      .catch(error => {
        console.log('error', error);
        // window.open('/', '_self');
      })
  }


  return (
    <div>
      <h2>Create Account</h2>
      <form>
        <input placeholder='Username' type='text' value={username} onChange={e => setUsername(e.target.value)}>
        </input>
        <input placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)}>
        </input>
        <input placeholder='Email' type='email' value={email} onChange={e => setEmail(e.target.value)}>
        </input>
        <button type='submit' onClick={e => handleRegister(e)}>Create Account</button>
      </form>
      <nav>
        <Link to='/'>Home</Link>
        <br></br>
        <Link to='/login'>Login</Link>
      </nav>
    </div>
  );
}

export default Registration;