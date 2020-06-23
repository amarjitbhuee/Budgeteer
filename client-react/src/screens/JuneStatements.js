import React from 'react';
import axios from "axios";
import '../transaction.min.css';
import JuneStatementIncome from '../components/transactionHistory/JuneStatementIncome';
import JuneStatementSavings from '../components/transactionHistory/JuneStatementSavings';
import JuneStatementExpense from '../components/transactionHistory/JuneStatementExpense';
import JuneIncome from '../components/calculator/JuneIncome';
import JuneExpense from '../components/calculator/JuneExpense';
import JuneSavings from '../components/calculator/JuneSavings';
import JuneStatementBalance from '../components/calculator/JuneStatementBalance';
import { Link } from 'react-router-dom';


class JuneStatements extends React.Component {
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
                <p className="transactions">June 2020</p>
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
                            <td className="tdata"><JuneStatementIncome /></td>
                            <td className="tdata"><JuneStatementExpense /></td>
                            <td className="tdata"><JuneStatementSavings /></td>
                        </tr>
                        <tr className="trow">
                            <td>Total Income: <JuneIncome /></td>
                            <td>Total Expense: <JuneExpense /></td>
                            <td>Total Savings: <JuneSavings /></td>
                        </tr>
                        <tr className="trow">
                            <td></td>
                            <td></td>
                            <td><JuneStatementBalance /></td>
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

export default JuneStatements; 