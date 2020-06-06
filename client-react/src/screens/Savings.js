import React from 'react';
import SavingsTransactions from '../components/transactionHistory/SavingsTransactions';
import Links from '../components/nav/Links';

export const Savings = () => {
  return (
    <div className="form">
        <h1 className="transactions">Your Savings History</h1>
        <SavingsTransactions />
        <Links />
      </div>
  )
}

export default Savings; 