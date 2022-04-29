import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { config } from './config';
import Loading from './Loading';
import axios from 'axios';
const key = config.API_KEY;

function Login(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogging, setIsLogging] = useState(false);

  console.log(props);

  const handleLogin = (e) => {
    console.log(username, 'is loggin in');

    e.preventDefault();
    setIsLogging(true);

    axios.post('https://weatherize-app.herokuapp.com/login/', {
      username,
      password
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(data.token);
        console.log(data.user.username);
        localStorage.setItem('weatherize-username', data.user.username)
        localStorage.setItem('weatherize-token', data.token)
        props.saveUser(data.user.username, data.token);
        setIsLogging(false);
        // window.open('/, '_self');
        window.open('/weatherize-react', '_self');
      })
      .catch(error => {
        console.log('error', error);
        // window.open('/, '_self');
        window.open('//weatherize-react', '_self');
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
        {isLogging ?
          <button className='button-primary loading'>Loggin in...</button> :
          <button
            className='button-primary'
            type='submit'
            onClick={e => handleLogin(e)}
          >Log in</button>
        }
      </form>
      <nav>
        <Link to='/' className='button-primary'>Home</Link>
        <br></br>
        <Link to='/register' className='button-primary'>Create Account</Link>
      </nav>
    </div>
  );
}

export default Login;