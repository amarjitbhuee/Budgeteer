import React from 'react';
import axios from "axios";
import '../transaction.min.css';
import Links from '../components/nav/Links';
// import { Link } from 'react-router-dom';
import StatementIncome from '../components/transactionHistory/StatementIncome';
import StatementSavings from '../components/transactionHistory/StatementSavings';
import StatementExpense from '../components/transactionHistory/StatementExpense';
import MonthlyIncome from '../components/calculator/MonthlyIncome';
import MonthlyExpense from '../components/calculator/MonthlyExpense';
import MonthlySavings from '../components/calculator/MonthlySavings';
import StatementBalance from '../components/calculator/StatementBalance';



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
            <div className="form">
                <p className="transactions">Profit and Loss</p>
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
                            <td><StatementIncome /></td>
                            <td><StatementExpense /></td>
                            <td><StatementSavings /></td>
                        </tr>
                        <tr>
                            <td>Total Income: <MonthlyIncome /></td>
                            <td>Total Expense: <MonthlyExpense /></td>
                            <td>Total Savings: <MonthlySavings /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><StatementBalance /></td>
                        </tr>
                    </tbody>
                </table>

                <Links />
            </div>
        );
    }
}

export default Statements; 