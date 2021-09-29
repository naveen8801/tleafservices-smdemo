import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashbaord from './pages/Dashbaord/Dashbaord';
import Navbar from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import NewDashboard from './pages/NewDashboard/NewDashboard';
import React, { useEffect, useState } from 'react';

function App() {
  const [verify, setverify] = useState({ islogin: false, id: null });
  const getVerify = (q) => {
    setverify({ islogin: q.islogin, id: q.id });
  };
  return (
    <div className="App">
      <div className="app-con">
        <Switch>
          <Route exact path="/">
            <Header />
            <Login givestatus={(z) => getVerify(z)} />
          </Route>
          {verify.islogin ? (
            <Route exact path="/dashboard">
              <Header id={verify.id} login />
              <NewDashboard />
            </Route>
          ) : null}
        </Switch>
      </div>
    </div>
  );
}

export default App;
