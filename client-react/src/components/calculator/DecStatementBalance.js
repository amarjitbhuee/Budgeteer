import React from 'react'
import axios from 'axios';
import '../../transaction.min.css';
import CurrencyFormat from 'react-currency-format';
// npm install react-currency-format --save

class DecStatementBalance extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            transactionsIncome: [],
            transactionsExpense: [], 
            transactionsSavings: [],
            currentBalance: '', 
        }
    }; 

    componentDidMount() {
        this.getIncome(); 
        this.getExpense();
        this.getSavings();
    };

    getIncome = () => {
        let url = "http://localhost:3001/transactions/incomeDecember";
        axios.get(url)
            .then(response => this.setState({ transactionsIncome: response.data}))

    }; 

    getExpense = () => {
        let url = "http://localhost:3001/transactions/expenseDecember"; 
        axios.get(url)
            .then(response => this.setState({ transactionsExpense: response.data}));
    };

    getSavings = () => {
        let url = "http://localhost:3001/transactions/savingsDecember"; 
        axios.get(url)
            .then(response => this.setState({ transactionsSavings: response.data})); 
    }; 

    render() {
        const amountsIncome = this.state.transactionsIncome.map(transaction => transaction.amount);
        const totalIncome = amountsIncome.reduce((acc, item) => (acc += item), 0).toFixed(2);

        const amountsExpense = this.state.transactionsExpense.map(transaction => transaction.amount);
        const totalExpense = amountsExpense.reduce((acc, item) => (acc += item), 0).toFixed(2);

        
        const amountsSavings = this.state.transactionsSavings.map(transaction => transaction.amount);
        const totalSavings = amountsSavings.reduce((acc, item) => (acc += item), 0).toFixed(2);

        const currentBalance = ((totalIncome-totalExpense) - (totalSavings)); 
        return(
            <div>
                <h1>Balance: <br /><CurrencyFormat value={currentBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h1>
            </div>
        )
    }
}
export default DecStatementBalance; 