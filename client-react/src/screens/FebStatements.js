import React from 'react';
import axios from "axios";
import '../transaction.min.css';
import FebStatementIncome from '../components/transactionHistory/FebStatementIncome';
import FebStatementSavings from '../components/transactionHistory/FebStatementSavings';
import FebStatementExpense from '../components/transactionHistory/FebStatementExpense';
import FebIncome from '../components/calculator/FebIncome';
import FebExpense from '../components/calculator/FebExpense';
import FebSavings from '../components/calculator/FebSavings';
import FebStatementBalance from '../components/calculator/FebStatementBalance';



class FebStatements extends React.Component {
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
                <p className="transactions">February 2020</p>
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
                            <td><FebStatementIncome /></td>
                            <td><FebStatementExpense /></td>
                            <td><FebStatementSavings /></td>
                        </tr>
                        <tr>
                            <td>Total Income: <FebIncome /></td>
                            <td>Total Expense: <FebExpense /></td>
                            <td>Total Savings: <FebSavings /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><FebStatementBalance /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default FebStatements; 