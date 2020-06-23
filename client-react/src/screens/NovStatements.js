import React from 'react';
import axios from "axios";
import '../transaction.min.css';
import NovStatementIncome from '../components/transactionHistory/NovStatementIncome';
import NovStatementSavings from '../components/transactionHistory/NovStatementSavings';
import NovStatementExpense from '../components/transactionHistory/NovStatementExpense';
import NovIncome from '../components/calculator/NovIncome';
import NovExpense from '../components/calculator/NovExpense';
import NovSavings from '../components/calculator/NovSavings';
import NovStatementBalance from '../components/calculator/NovStatementBalance';



class NovStatements extends React.Component {
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
                <p className="transactions">November 2020</p>
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
                            <td><NovStatementIncome /></td>
                            <td><NovStatementExpense /></td>
                            <td><NovStatementSavings /></td>
                        </tr>
                        <tr>
                            <td>Total Income: <NovIncome /></td>
                            <td>Total Expense: <NovExpense /></td>
                            <td>Total Savings: <NovSavings /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><NovStatementBalance /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default NovStatements; 