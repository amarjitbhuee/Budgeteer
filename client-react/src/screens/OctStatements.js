import React from 'react';
import axios from "axios";
import '../transaction.min.css';
import OctStatementIncome from '../components/transactionHistory/OctStatementIncome';
import OctStatementSavings from '../components/transactionHistory/OctStatementSavings';
import OctStatementExpense from '../components/transactionHistory/OctStatementExpense';
import OctIncome from '../components/calculator/OctIncome';
import OctExpense from '../components/calculator/OctExpense';
import OctSavings from '../components/calculator/OctSavings';
import OctStatementBalance from '../components/calculator/OctStatementBalance';



class OctStatements extends React.Component {
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
                <p className="transactions">October 2020</p>
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
                            <td><OctStatementIncome /></td>
                            <td><OctStatementExpense /></td>
                            <td><OctStatementSavings /></td>
                        </tr>
                        <tr>
                            <td>Total Income: <OctIncome /></td>
                            <td>Total Expense: <OctExpense /></td>
                            <td>Total Savings: <OctSavings /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><OctStatementBalance /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default OctStatements; 