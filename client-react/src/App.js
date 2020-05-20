import React from "react";
import  Transaction from "./components/Transaction";
import "./App.css";
//Jeff imported Update from screens
import History from "./screens/History";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UpdateItem from "./components/UpdateItem";  

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Transaction} />
          <Route path="/history" exact component={History} />
          <Route path="/history/:id" component={UpdateItem} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
