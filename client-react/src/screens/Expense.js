import React from 'react';
import ExpenseTransactions from '../components/transactionHistory/ExpenseTransactions';

export const Income = () => {
  return (
    <div className="form">
        <h1 className="transactions">Your Expense History</h1>
        <ExpenseTransactions />
      </div>
  )
}

export default Income; 