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

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* Jeff: added <hr/> to help visually seperate components... Make sure it is deleted if needed */}
        <hr/>
        <CurrentBalance />
        {/* Jeff: added <hr/> to help visually seperate components... Make sure it is deleted if needed */}
        <hr/>
        <Switch>
          <Route path="/" exact component={ Transaction } />
          <Route path="/history"  component={ History } />
          <Route path="/edit/:transactionid" component={ Edit } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
