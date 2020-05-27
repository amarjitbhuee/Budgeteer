import React from "react";
import "./App.css";
//Jeff added history screen
import History from "./screens/History";
//Jeff added router/switch
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Edit from "./screens/Edit";
// import User from './components/User';
// import EditUser from "./screens/EditUser";  
import Transaction from "./components/Transaction";
//Jeff: added edit screen
//Jeff: added Current Balance  
import CurrentBalance from "./components/CurrentBalance"
import Header from "./components/Header"
import GlorifiedCalculator from "./components/GlorifiedCalculator";

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
        <GlorifiedCalculator />
        {/* Jeff: added <hr/> to help visually seperate components... Make sure it is deleted if needed */}
        <hr/>
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
