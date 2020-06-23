import React from 'react';
import axios from "axios";
import '../transaction.min.css';
import JulStatementIncome from '../components/transactionHistory/JulStatementIncome';
import JulStatementSavings from '../components/transactionHistory/JulStatementSavings';
import JulStatementExpense from '../components/transactionHistory/JulStatementExpense';
import JulIncome from '../components/calculator/JulIncome';
import JulExpense from '../components/calculator/JulExpense';
import JulSavings from '../components/calculator/JulSavings';
import JulStatementBalance from '../components/calculator/JulStatementBalance';
import { Link } from 'react-router-dom';


class JulStatements extends React.Component {
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
            <div className="form">
                <p className="transactions">Profit and Loss</p>
                <p className="transactions">July 2020</p>
                <table className="table">
                    <thead className="thead">
                        <tr className="trow">
                            <th>Income</th>
                            <th>Expense</th>
                            <th>Savings</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        <tr className="trow">
                            <td className="tdata"><JulStatementIncome /></td>
                            <td className="tdata"><JulStatementExpense /></td>
                            <td className="tdata"><JulStatementSavings /></td>
                        </tr>
                        <tr className="trow">
                            <td>Total Income: <JulIncome /></td>
                            <td>Total Expense: <JulExpense /></td>
                            <td>Total Savings: <JulSavings /></td>
                        </tr>
                        <tr className="trow">
                            <td></td>
                            <td></td>
                            <td><JulStatementBalance /></td>
                        </tr>
                    </tbody>
                </table>
                <Link to={`/JanStatements`}>January</Link><br />
                <Link to={`/FebStatements`}>February</Link><br />
                <Link to={`/MarStatements`}>March</Link><br />
                <Link to={`/AprStatements`}>April</Link><br />
                <Link to={`/MayStatements`}>May</Link><br />
                <Link to={`/JuneStatements`}>June</Link><br />
                <Link to={`/JulStatements`}>July</Link><br />
                <Link to={`/AugStatements`}>August</Link><br />
                <Link to={`/SepStatements`}>September</Link><br />
                <Link to={`/OctStatements`}>October</Link><br />
                <Link to={`/NovStatements`}>November</Link><br />
                <Link to={`/DecStatements`}>December</Link><br />

            </div>
        );
    }
}

export default JulStatements; 