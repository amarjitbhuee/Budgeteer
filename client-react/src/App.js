import React from "react";
// import Transaction from './components/Transaction';
import User from './components/User';
import "./App.css";
//Jeff imported Update from screens
import History from "./screens/History";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import Edit from "./screens/Edit";
import EditUser from "./screens/EditUser";  

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={ User } />
          <Route path="/history"  component={ History } />
          <Route path="/edituser/:userid" component={ EditUser } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
