// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Registration from './Registration';
import { Hourly } from './Hourly';
import { FavsHourly } from './FavsHourly';
import './App.css';

function App() {

  return (
    <div className="App">
      <h1>Weatherize</h1>
      <Router
      // basename={'/weatherize-react'}
      >
        <Routes>
      <Route exact path='/' element={ <Dashboard /> }></Route>
      <Route exact path='/hourly' element={ <Hourly /> }></Route>
      <Route exact path='/login' element={ <Login /> }></Route>
      <Route exact path='/register' element={ <Registration /> }></Route>
      {/* <Route exact path='/favorites/:city' element={ <FavsHourly /> }></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;