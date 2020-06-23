import React from 'react';
import axios from "axios";
import '../transaction.min.css';
import MarStatementIncome from '../components/transactionHistory/MarStatementIncome';
import MarStatementSavings from '../components/transactionHistory/MarStatementSavings';
import MarStatementExpense from '../components/transactionHistory/MarStatementExpense';
import MarIncome from '../components/calculator/MarIncome';
import MarExpense from '../components/calculator/MarExpense';
import MarSavings from '../components/calculator/MarSavings';
import MarStatementBalance from '../components/calculator/MarStatementBalance';



class MarStatements extends React.Component {
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
                <p className="transactions">March 2020</p>
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
                            <td><MarStatementIncome /></td>
                            <td><MarStatementExpense /></td>
                            <td><MarStatementSavings /></td>
                        </tr>
                        <tr>
                            <td>Total Income: <MarIncome /></td>
                            <td>Total Expense: <MarExpense /></td>
                            <td>Total Savings: <MarSavings /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><MarStatementBalance /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MarStatements; 