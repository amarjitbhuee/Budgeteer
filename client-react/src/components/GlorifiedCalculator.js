import React from 'react'
import Expense from '../components/Expense';

export const GlorifiedCalculator = () => {
    return (
        <div>
            <h5>Income: </h5> 
            <h5>Expenses: <Expense />  </h5> 
            <h5>Savings: </h5> 
            <h5>Savings Goal: </h5>
        </div>
    )
}

export default GlorifiedCalculator;