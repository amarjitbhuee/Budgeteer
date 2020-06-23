import React from 'react';
import Income from '../calculator/Income';
import Expense from '../calculator/Expense';
import Savings from '../calculator/Savings';
import Logo2 from '../../../src/assets/img/Logo2.png';
import { Link } from 'react-router-dom';

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
                        <Link to={`/Income`}><h5 className="glorifiedCalculator"><span className="positive">+ </span><span className="underline">Income: </span><Income /></h5></Link>
                    </div>
                    <div className="block">
                        <Link to={`/Expense`}><h5 className="glorifiedCalculator"><span className="negative">- </span><span className="underline"> Expenses: </span><Expense /></h5></Link>
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