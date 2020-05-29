import React from "react";
import User from './components/User';
import "./App.css";
//Jeff added history screen
import History from "./screens/History";
//Jeff added router/switch
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//Jeff: added edit screen
import Edit from "./screens/Edit";
//Jeff: added Current Balance  
import EditUser from "./screens/EditUser";
import CurrentBalance from "./components/CurrentBalance"
import Header from "./components/Header"
import GlorifiedCalculator from "./components/GlorifiedCalculator";
import Transaction from "./components/Transaction";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* Jeff: added <hr/> to help visually seperate components... Make sure it is deleted if needed */}
        <hr />
        <CurrentBalance />
        {/* Jeff: added <hr/> to help visually seperate components... Make sure it is deleted if needed */}
        <hr />
        <GlorifiedCalculator />
        {/* Jeff: added <hr/> to help visually seperate components... Make sure it is deleted if needed */}
        <hr />
        <Switch>
          <Route path="/" exact component={User} />
          <Route path="/transaction" exact component={Transaction} />
          <Route path="/history" component={History} />
          <Route path="/edit/:transactionid" component={Edit} />
          <Route path="/edituser/:userid" component={EditUser} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
