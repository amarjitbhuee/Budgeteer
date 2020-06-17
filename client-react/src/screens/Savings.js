import React from 'react';
import SavingsTransactions from '../components/transactionHistory/SavingsTransactions';

export const Savings = () => {
  return (
    <div className="form">
        <h1 className="transactions">Your Savings History</h1>
        <SavingsTransactions />
      </div>
  )
}

export default Savings; 