import React from 'react';
import { Link } from 'react-router-dom';
import { config } from './config';
const key = config.API_KEY;

function Login() {


  return (
    <div>
      <h2>Log in</h2>
      <form>
        <input placeholder='username'>
        </input>
        <input placeholder='password'>
        </input>
        <button>Log in</button>
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