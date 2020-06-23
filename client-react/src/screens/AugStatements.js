import React from 'react';
import axios from "axios";
import '../transaction.min.css';
import AugStatementIncome from '../components/transactionHistory/AugStatementIncome';
import AugStatementSavings from '../components/transactionHistory/AugStatementSavings';
import AugStatementExpense from '../components/transactionHistory/AugStatementExpense';
import AugIncome from '../components/calculator/AugIncome';
import AugExpense from '../components/calculator/AugExpense';
import AugSavings from '../components/calculator/AugSavings';
import AugStatementBalance from '../components/calculator/AugStatementBalance';



class AugStatements extends React.Component {
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
                <p className="transactions">August 2020</p>
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
                            <td className="tdata"><AugStatementIncome /></td>
                            <td className="tdata"><AugStatementExpense /></td>
                            <td className="tdata"><AugStatementSavings /></td>
                        </tr>
                        <tr className="trow">
                            <td>Total Income: <AugIncome /></td>
                            <td>Total Expense: <AugExpense /></td>
                            <td>Total Savings: <AugSavings /></td>
                        </tr>
                        <tr className="trow">
                            <td></td>
                            <td></td>
                            <td><AugStatementBalance /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AugStatements; 