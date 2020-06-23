import React from 'react';
import axios from "axios";
import '../transaction.min.css';
import JanStatementIncome from '../components/transactionHistory/JanStatementIncome';
import JanStatementSavings from '../components/transactionHistory/JanStatementSavings';
import JanStatementExpense from '../components/transactionHistory/JanStatementExpense';
import JanIncome from '../components/calculator/JanIncome';
import JanExpense from '../components/calculator/JanExpense';
import JanSavings from '../components/calculator/JanSavings';
import JanStatementBalance from '../components/calculator/JanStatementBalance';
import { Link } from 'react-router-dom';



class JanStatements extends React.Component {
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
                <p className="transactions">January 2020</p>
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
                            <td className="tdata"><JanStatementIncome /></td>
                            <td className="tdata"><JanStatementExpense /></td>
                            <td className="tdata"><JanStatementSavings /></td>
                        </tr>
                        <tr className="trow">
                            <td>Total Income: <JanIncome /></td>
                            <td>Total Expense: <JanExpense /></td>
                            <td>Total Savings: <JanSavings /></td>
                        </tr>
                        <tr className="trow">
                            <td></td>
                            <td></td>
                            <td><JanStatementBalance /></td>
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

export default JanStatements; 