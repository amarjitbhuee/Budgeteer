import React from 'react';
import Income from './/Income';  
import Expense from './/Expense'; 
import Savings from './/Savings'; 
import Logo2 from '../assets/img/Logo2.png';
import { Link } from 'react-router-dom'


export const GlorifiedCalculator = () => {
    return (
        <div>
            <p className="overview">Your Transaction Overview:</p> 
            <div className="glorified">
                <div className="calculator">
                    <div className="block">
                        <Link to={`/history`}><img className="logo2" src={Logo2} alt="LogoType" /></Link>
                    </div>
                    <div className="block">
                        <Link to={`/Income`}><h5 className="glorifiedCalculator"><span className="underline">Income: </span><Income /></h5></Link>
                    </div>
                    <div className="block">    
                        <Link to={`/Expense`}><h5 className="glorifiedCalculator"><span className="underline">Expenses: </span><Expense /></h5></Link>
                    </div>
                    <div className="block">    
                        <Link to={`/Savings`}><h5 className="glorifiedCalculator"><span className="underline">Savings: </span><Savings /></h5></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlorifiedCalculator;