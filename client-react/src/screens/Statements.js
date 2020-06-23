import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from "axios";
import '../transaction.min.css';
import JuneStatements from './JuneStatements';
import JanStatements from './JanStatements';
import FebStatements from './FebStatements';
import MarStatements from './MarStatements';
import AprStatements from './AprStatements';
import MayStatements from './MayStatements';
import JulStatements from './JulStatements';
import AugStatements from './AugStatements';
import SepStatements from './SepStatements';
import OctStatements from './OctStatements';
import NovStatements from './NovStatements';
import DecStatements from './DecStatements';
import { Link } from 'react-router-dom';


class Statements extends React.Component {
    constructor(props) {
        super(props);
        this.state = { transactions: [] };
    }
    componentDidMount() {
        this.getData();
        this.getIncome();
        this.getExpense();
        this.getSavings();
    };

    getIncome = () => {
        let url = "http://localhost:3001/transactions/income";
        axios.get(url)
            .then(response => this.setState({ transactionsIncome: response.data }))

    };

    getExpense = () => {
        let url = "http://localhost:3001/transactions/expense";
        axios.get(url)
            .then(response => this.setState({ transactionsExpense: response.data }));
    }; d

    getSavings = () => {
        let url = "http://localhost:3001/transactions/savings";
        axios.get(url)
            .then(response => this.setState({ transactionsSavings: response.data }));
    }
    getData = () => {
        let url = "http://localhost:3001/transactions/statements";
        axios.get(url)
            .then(response => this.setState({ transactions: response.data }));
    };

    render() {
        return (
            <Router>
                <div>
                    <div className="form">
                        <p className="transactions">Profit and Loss</p>
                        <Switch>
                            <Route path="/" component={JuneStatements} />
                            <Route path="/JanStatements" component={JanStatements} />
                            <Route path="/FebStatements" component={FebStatements} />
                            <Route path="/MarStatements" component={MarStatements} />
                            <Route path="/AprStatements" component={AprStatements} />
                            <Route path="/MayStatements" component={MayStatements} />
                            <Route path="/JuneStatements" component={JuneStatements} />
                            <Route path="/JulStatements" component={JulStatements} />
                            <Route path="/AugStatements" component={AugStatements} />
                            <Route path="/SepStatements" component={SepStatements} />
                            <Route path="/OctStatements" component={OctStatements} />
                            <Route path="/NovStatements" component={NovStatements} />
                            <Route path="/DecStatements" component={DecStatements} />
                        </Switch>

                        <div>
                            <Link to={`/JanStatements`}>January Statement</Link><br />
                            <Link to={`/FebStatements`}>February Statement</Link><br />
                            <Link to={`/MarStatements`}>March Statement</Link><br />
                            <Link to={`/AprStatements`}>April Statement</Link><br />
                            <Link to={`/MayStatements`}>May Statement</Link><br />
                            <Link to={`/JuneStatements`}>June Statement</Link><br />
                            <Link to={`/JulStatements`}>July Statement</Link><br />
                            <Link to={`/AugStatements`}>August Statement</Link><br />
                            <Link to={`/SepStatements`}>September Statement</Link><br />
                            <Link to={`/OctStatements`}>October Statement</Link><br />
                            <Link to={`/NovStatements`}>November Statement</Link><br />
                            <Link to={`/DecStatements`}>December Statement</Link><br />
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Statements; 