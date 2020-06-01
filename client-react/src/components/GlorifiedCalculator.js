import React from 'react';
import Income from './/Income';  
import Expense from './/Expense'; 
import Savings from './/Savings'; 


export const GlorifiedCalculator = () => {
    return (
        <div>
            <h5>Income: <Income /></h5>
            <h5>Expenses: <Expense /></h5> 
            <h5>Savings: <Savings /></h5>
        </div>
    )
}

export default GlorifiedCalculator;