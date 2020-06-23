import React from 'react'; 
import axios from 'axios'; 
import '../../transaction.min.css'; 
import CurrencyFormat from 'react-currency-format';
// npm install react-currency-format --save

class AugExpense extends React.Component {
    constructor(props) {
        super(props); 
        this.state ={
            transactions: [],            
        }
    }

    componentDidMount() {
        this.getExpense(); 
    };
    
    getExpense = () => {
        let url = "http://localhost:3001/transactions/expenseAugust"; 
        axios.get(url)
            .then(response => this.setState({ transactions: response.data})); 
    }; 

    render() {
        const amounts = this.state.transactions.map(transaction => transaction.amount);
        const total = amounts.reduce((acc, item) => (acc += item), 0);
        return(
            <div>
                <h3><CurrencyFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h3>
            </div>
        )
    }
}

export default AugExpense; 