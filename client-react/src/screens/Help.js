import React from 'react';
import Logo from '../assets/img/Logo.png';
import { Link } from 'react-router-dom';
import formExample from '../assets/img/formExample.png';
import paymentType from '../assets/img/paymentType.png';
import date from '../assets/img/date.png'; 
import balances from '../assets/img/balances.png'; 
import ledger from '../assets/img/ledger.jpg'; 
import compare from '../assets/img/compare.png'

export const Help = () => {
    return (
        <div className="form">
            <h4>Hey there,</h4>
            <h1>Thanks for choosing</h1>
            <img className="logoHelp" src={Logo} alt="Logo" />
            <br />
            <hr />
            <h3>Instructions: </h3>
            <h4>The Form: What's Required?</h4>
            <img className="formExample" src={formExample} alt="Form" />
            <br />
            <br />
            <h5>#1 The Payment Type</h5>
            <img className="paymentType" src={paymentType} alt="Payment Type Example" /><br />
            <p className="instructions">
                The "Payment Type" gives you the option to select from Direct Deposit, 
                Check <span className="joke">(for those still rockin' the checkbook)</span>, Credit Card, Cash, or Other. This field is not madatory; however, it is encouraged. 
                If you choose to leave this field blank you will receive an N/A within your transaction History. This will not effect your balances in any way if it is filled out
                or not.
            </p>
            <br />
            <hr />
            <br />
            <h5>#2 The Date</h5>
            <img className="date" src={date} alt="Date Example" />
            <br />
            <p className="instructions">
                The "Date" allows you to keep track of you when your transactions were made. Depending on how you do your budgeting you can either make transactions as you go or plan
                it out so you can see what your balances look like allowing you to make better invensting or spending decision. This field is not required; however it is also 
                encouraged. This will not effect your balances in any way if it is filled out or not. If you choose to leave it out, it will leave that column blank with in your transaction's history.
            </p>
            <br />
            <hr />
            <br />
            <h5>#3 The Type</h5>
            <img className="balances" src={balances} alt="Form" />
            <br />
            <p className="instructions">
                Unlike the first 2 fields the type is required in order to see the transaction adjust the balance. The balances depend on the type to function properly. The Income adds
                to the current balance, while the Expenses will subtract from your current balance. Savings will also subtract from your current balance as the goal is to stash the Cash
                as if it was being take away. You will also notice as you make more transactions your Income will add only your income transactions. The Expenses will add only your expenses
                giving you an idea of how much spending verses saving. And Savings will only add your savings transactions. <br /> <br /><h5>Also: </h5> The curent balance, income, expenses and savings
                fields are also links. Current balance will direct you to all of your transactions, income will direct you to all of your income transactions, epxenses will direct you 
                to your expense transactions and savings will direct you to all of your savings transactions. 
            </p>
            <br />
            <hr />
            <br />
            <h5>#4 Amount</h5>
            <p className="instructions"> 
                This field MUST be filled out. If you fill out the other fields but left this one blank. You will notice that the app will not update your balances or transaction history.
            </p>
            <br />
            <hr />
            <br />
            <h5>#5 Description</h5>
            <p>How often do we do things and forget what it was for? We know we do, so we added a descritpon field to jog our memories about the what, when where, and why a transaction was made.
                Actually, this idea has been implemented for years. The entire foundation of this app was based on a checkbook ledger... (I think we found one in the museum in the ancient artifacts). 
                But that is another story in itself. 
            </p>
            <div>
                <img className="ledger" src={ledger} alt="ledger" />
                <br />
                <br />
                <img className="compare" src={compare} alt="compare" />
            </div>
            <br />
            <Link to={`/`} className="allTransactions">Home</Link><br /><br />
            <Link to={`/history`} className="allTransactions">View All Transactions</Link><br /><br />
        </div>
    )
}

export default Help; 
