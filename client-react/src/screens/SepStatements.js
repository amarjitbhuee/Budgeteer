import React from 'react';
import axios from "axios";
import '../transaction.min.css';
import SepStatementIncome from '../components/transactionHistory/SepStatementIncome';
import SepStatementSavings from '../components/transactionHistory/SepStatementSavings';
import SepStatementExpense from '../components/transactionHistory/SepStatementExpense';
import SepIncome from '../components/calculator/SepIncome';
import SepExpense from '../components/calculator/SepExpense';
import SepSavings from '../components/calculator/SepSavings';
import SepStatementBalance from '../components/calculator/SepStatementBalance';



class SepStatements extends React.Component {
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
                <p className="transactions">September 2020</p>
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
                            <td className="tdata"><SepStatementIncome /></td>
                            <td className="tdata"><SepStatementExpense /></td>
                            <td className="tdata"><SepStatementSavings /></td>
                        </tr>
                        <tr className="trow">
                            <td>Total Income: <SepIncome /></td>
                            <td>Total Expense: <SepExpense /></td>
                            <td>Total Savings: <SepSavings /></td>
                        </tr>
                        <tr className="trow">
                            <td></td>
                            <td></td>
                            <td><SepStatementBalance /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SepStatements; 