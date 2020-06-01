import React from 'react'
import axios from 'axios';
import '../transaction.min.css';

class CurrentBalance extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            transactionsIncome: [],
            transactionsExpense: [], 
            transactionsSavings: [],
            currentBalance: 0, 
        }
    }; 

    componentDidMount() {
        this.getIncome(); 
        this.getExpense();
        this.getSavings();
    };

    getIncome = () => {
        let url = "http://localhost:3001/transactions/income";
        axios.get(url)
            .then(response => this.setState({ transactionsIncome: response.data}))

    }; 

    getExpense = () => {
        let url = "http://localhost:3001/transactions/expense"; 
        axios.get(url)
            .then(response => this.setState({ transactionsExpense: response.data}));
    };

    getSavings = () => {
        let url = "http://localhost:3001/transactions/savings"; 
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

        const currentBalance = ((totalIncome-totalExpense) - (totalSavings)).toFixed(2); 
        return(
            <div>
                <h5 className="currentBalance">Your Current Balance: <br /><span className="balance">${currentBalance}</span></h5>
            </div>
        )
    }
}
export default CurrentBalance; 