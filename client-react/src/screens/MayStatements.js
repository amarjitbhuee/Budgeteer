import React from 'react';
import axios from "axios";
import '../transaction.min.css';
import MayStatementIncome from '../components/transactionHistory/MayStatementIncome';
import MayStatementSavings from '../components/transactionHistory/MayStatementSavings';
import MayStatementExpense from '../components/transactionHistory/MayStatementExpense';
import MayIncome from '../components/calculator/MayIncome';
import MayExpense from '../components/calculator/MayExpense';
import MaySavings from '../components/calculator/MaySavings';
import MayStatementBalance from '../components/calculator/MayStatementBalance';



class MayStatements extends React.Component {
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
                <p className="transactions">May 2020</p>
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
                            <td className="tdata"><MayStatementIncome /></td>
                            <td className="tdata"><MayStatementExpense /></td>
                            <td className="tdata"><MayStatementSavings /></td>
                        </tr>
                        <tr className="trow">
                            <td>Total Income: <MayIncome /></td>
                            <td>Total Expense: <MayExpense /></td>
                            <td>Total Savings: <MaySavings /></td>
                        </tr>
                        <tr className="trow">
                            <td></td>
                            <td></td>
                            <td><MayStatementBalance /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MayStatements; 