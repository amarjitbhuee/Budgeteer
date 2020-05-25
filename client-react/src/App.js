import React from "react";
import Transaction from './components/Transaction';
// import User from './components/User';
import "./App.css";
//Jeff imported Update from screens
import History from "./screens/History";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Edit from "./screens/Edit";  

function App() {
  return (
    <Router>
      <div className="App">
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
