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
                <p className="transactions">July 2020</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Income</th>
                            <th>Expense</th>
                            <th>Savings</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><JulStatementIncome /></td>
                            <td><JulStatementExpense /></td>
                            <td><JulStatementSavings /></td>
                        </tr>
                        <tr>
                            <td>Total Income: <JulIncome /></td>
                            <td>Total Expense: <JulExpense /></td>
                            <td>Total Savings: <JulSavings /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><JulStatementBalance /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default JulStatements; 