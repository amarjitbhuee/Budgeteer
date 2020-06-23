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
                <p className="transactions">June 2020</p>
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
                            <td><JuneStatementIncome /></td>
                            <td><JuneStatementExpense /></td>
                            <td><JuneStatementSavings /></td>
                        </tr>
                        <tr>
                            <td>Total Income: <JuneIncome /></td>
                            <td>Total Expense: <JuneExpense /></td>
                            <td>Total Savings: <JuneSavings /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><JuneStatementBalance /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Statements; 