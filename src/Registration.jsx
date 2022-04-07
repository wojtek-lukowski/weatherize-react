import React from 'react';
import { Link } from 'react-router-dom';
import { config } from './config';
const key = config.API_KEY;

function Registration() {


  return (
    <div>
      <h2>Create Account</h2>
      <form>
        <input placeholder='username'>
        </input>
        <input placeholder='password'>
        </input>
        <button>Create Account</button>
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