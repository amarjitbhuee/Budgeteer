import React from 'react';
import IncomeTransactions from '../components/transactionHistory/IncomeTransactions';
import Links from '../components/nav/Links';

export const Income = () => {
  return (
    <div className="form">
        <h1 className="transactions">Your Income History</h1>
        <IncomeTransactions />
        <Links />
      </div>
  )
}

export default Income; 