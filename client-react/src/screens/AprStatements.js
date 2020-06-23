import React from 'react';
import axios from "axios";
import '../transaction.min.css';
import AprStatementIncome from '../components/transactionHistory/AprStatementIncome';
import AprStatementSavings from '../components/transactionHistory/AprStatementSavings';
import AprStatementExpense from '../components/transactionHistory/AprStatementExpense';
import AprIncome from '../components/calculator/AprIncome';
import AprExpense from '../components/calculator/AprExpense';
import AprSavings from '../components/calculator/AprSavings';
import AprStatementBalance from '../components/calculator/AprStatementBalance';



class AprStatements extends React.Component {
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
                <p className="transactions">April 2020</p>
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
                            <td><AprStatementIncome /></td>
                            <td><AprStatementExpense /></td>
                            <td><AprStatementSavings /></td>
                        </tr>
                        <tr>
                            <td>Total Income: <AprIncome /></td>
                            <td>Total Expense: <AprExpense /></td>
                            <td>Total Savings: <AprSavings /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><AprStatementBalance /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AprStatements; 