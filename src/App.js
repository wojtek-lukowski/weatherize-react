// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Registration from './Registration';
import Hourly from './Hourly';
import './App.css';

function App() {

  return (
    <div className="App">
      <h1>Weatherize</h1>
      {/* <Dashboard/> */}
      <Router>
        <Routes>
      <Route exact path='/' element={ <Dashboard /> }></Route>
      <Route exact path='/hourly' element={ <Hourly /> }></Route>
      <Route exact path='/login' element={ <Login /> }></Route>
      <Route exact path='/register' element={ <Registration /> }></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

{/* <Route exact path='/' render={() => {return (<Dashboard /> )}} /> */}
{/* <Route exact path='/login' render={() => {return (<Login /> )}} /> */}