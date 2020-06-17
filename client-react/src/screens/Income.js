import React from 'react';
import IncomeTransactions from '../components/transactionHistory/IncomeTransactions';

export const Income = () => {
  return (
    <div className="form">
        <h1 className="transactions">Your Income History</h1>
        <IncomeTransactions />
      </div>
  )
}

export default Income; 