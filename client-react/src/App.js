import React from "react";
import Transaction from './components/Transaction';
// import User from './components/User';
import "./App.css";
//Jeff added history screen
import History from "./screens/History";
//Jeff added router/switch
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//Jeff: added edit screen
import Edit from "./screens/Edit";
//Jeff: added Current Balance  
import CurrentBalance from "./components/CurrentBalance"
import Header from "./components/Header"
import GlorifiedCalculator from "./components/GlorifiedCalculator";
import Income from "./screens/Income";
import Expense from "./screens/Expense";
import Savings from "./screens/Savings";
import Help from "./screens/Help"; 

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <div className="budgeteer">
            <div className="head">
              <Header />
              <CurrentBalance />
            </div> 
          <GlorifiedCalculator />
          <Switch>
            <Route path="/Income" component={ Income } />
            <Route path="/Expense" component={ Expense } />
            <Route path="/Savings" component={ Savings } />
            <Route path="/" exact component={ Transaction } />
            <Route path="/history"  component={ History } />
            <Route path="/edit/:transactionid" component={ Edit } />
            <Route path="/Help" component={ Help } />
          </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
