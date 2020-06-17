import React from 'react';
import axios from 'axios';

class Expense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }

    };

    componentDidMount() {
        this.getExpense();
        console.log('componentDidMount');
    }

    getExpense = () => {
        // Express uses port 3001 (react uses 3000)
        let url = "http://localhost:3001/users/1/expense";
        axios.get(url)
            .then(response => this.setState({ users: response.data }));
    };

    render() {
        // const amounts = this.state.transactions.map(transaction => transaction.amount);
        // const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
        return (
            <div>
                <ul>
                    {this.state.users.map(p => (
                        <li key={p.userid}>
                            {p.userid}
                            {/* <h1>${total}</h1> */}
                        </li>))}
                </ul>
            </div>)
    }
}

export default Expense;