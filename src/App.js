// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Registration from './Registration';
import LongTerm from './LongTerm';
import './App.css';

function App() {

  return (
    <div className="App">
      <h1>Weatherize</h1>
      {/* <Dashboard/> */}
      <Router>
        <Routes>
      <Route exact path='/' element={ <Dashboard /> }></Route>
      <Route exact path='/longterm' element={ <LongTerm /> }></Route>
      <Route exact path='/login' element={ <Login /> }></Route>
      <Route exact path='/register' element={ <Registration /> }></Route>
      {/* <Route exact path='/' render={() => {return (<Dashboard /> )}} /> */}
      {/* <Route exact path='/login' render={() => {return (<Login /> )}} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
