import React from 'react';
import ExpenseTransactions from '../components/transactionHistory/ExpenseTransactions';
import Links from '../components/nav/Links';

export const Income = () => {
  return (
    <div className="form">
        <h1 className="transactions">Your Expense History</h1>
        <ExpenseTransactions />
        <Links />
      </div>
  )
}

export default Income; 