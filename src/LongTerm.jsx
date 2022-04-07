import React from 'react';
import { Link } from 'react-router-dom';
import { config } from './config';
const key = config.API_KEY;

function Login() {


  return (
    <div>
      <h2>Longterm</h2>
      <nav>
        <Link to='/'>Home</Link>
      </nav>
    </div>
  );
}

export default Login;