import React from "react";
// import Signup_Login from './screens/forms/Signup_Login';
import Login from './screens/forms/LoginForm';
import AddTransaction from './screens/AddTransaction';
import "./App.css";
import History from "./screens/History";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Edit from "./screens/Edit";
//Don't forget to import once figured out 
import CurrentBalance from "./components/calculator/CurrentBalance"
import Header from "./components/Header"
import GlorifiedCalculator from "./components/calculator/GlorifiedCalculator";
import Income from "./screens/Income";
import Expense from "./screens/Expense";
import Savings from "./screens/Savings";
import Help from "./screens/Help";
import Statements from "./screens/Statements";
import Links from './components/nav/Links';

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
              {/* Jeff made signup & Login page screens */}
              {/* go back thorugh and make everything uniform! */}
              {/* <Route path="/" exact component={Signup_Login} /> */}
              <Route path="/Login" component={Login} />
              {/* Go back to see if below works */}
              <Route path="/addTransaction" component={AddTransaction} />\
              <Route path="/" exact component={AddTransaction} />
              <Route path="/history" component={History} />
              <Route path="/Income" component={Income} />
              <Route path="/Expense" component={Expense} />
              <Route path="/Savings" component={Savings} />
              <Route path="/edit/:transactionid" component={Edit} />
              <Route path="/Help" component={Help} />
              <Route path="/Statements" component={Statements} />
            </Switch>
            <div className="form">
              <Links />
            </div>
          </div>
        </div>
      </div>
    </Router >
  );
}

export default App;
