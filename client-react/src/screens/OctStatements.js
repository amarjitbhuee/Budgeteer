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
import { Link } from 'react-router-dom';


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
                <p className="transactions">Profit and Loss</p>
                <p className="transactions">October 2020</p>
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
                            <td className="tdata"><OctStatementIncome /></td>
                            <td className="tdata"><OctStatementExpense /></td>
                            <td className="tdata"><OctStatementSavings /></td>
                        </tr>
                        <tr className="trow">
                            <td>Total Income: <OctIncome /></td>
                            <td>Total Expense: <OctExpense /></td>
                            <td>Total Savings: <OctSavings /></td>
                        </tr>
                        <tr className="trow">
                            <td></td>
                            <td></td>
                            <td><OctStatementBalance /></td>
                        </tr>
                    </tbody>
                </table>
                <Link to={`/JanStatements`}>January</Link><br />
                <Link to={`/FebStatements`}>February</Link><br />
                <Link to={`/MarStatements`}>March</Link><br />
                <Link to={`/AprStatements`}>April</Link><br />
                <Link to={`/MayStatements`}>May</Link><br />
                <Link to={`/JuneStatements`}>June</Link><br />
                <Link to={`/JulStatements`}>July</Link><br />
                <Link to={`/AugStatements`}>August</Link><br />
                <Link to={`/SepStatements`}>September</Link><br />
                <Link to={`/OctStatements`}>October</Link><br />
                <Link to={`/NovStatements`}>November</Link><br />
                <Link to={`/DecStatements`}>December</Link><br />

            </div>
        );
    }
}

export default OctStatements; 