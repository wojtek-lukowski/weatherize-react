import React from 'react';
import { Link } from 'react-router-dom';
import { config } from './config';
const key = config.API_KEY;

function Login() {


  return (
    <div>Login component here
      <nav>
        <Link to='/'>Back</Link>
      </nav>
    </div>
  );
}

export default Login;