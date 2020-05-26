import React from "react";
import "./App.css";
//Jeff imported Update from screens
import History from "./screens/History";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Edit from "./screens/Edit";
// import User from './components/User';
// import EditUser from "./screens/EditUser";  
import Transaction from "./components/Transaction";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={ Transaction } />
          <Route path="/history"  component={ History } />
          <Route path="/edituser/:userid" component={ Edit } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
