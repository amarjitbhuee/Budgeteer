import React from 'react';
import { Link } from 'react-router-dom';

export const IndividualLinks = () => {
    return (
        <div className="nav">
            <Link to={`/`} className="allTransactions">Home</Link>|
            <Link to={`/History`} className="allTransactions">All Transactions</Link> |
            <Link to={`/Income`} className="allTransactions">Income</Link> |
            <Link to={`/Expense`} className="allTransactions">Expenses</Link> |
            <Link to={`/Savings`} className="allTransactions">Savings</Link> |
            <Link to={`/JuneStatements`} className="allTransactions">Statements</Link>
        </div>
    )
}

export default IndividualLinks;