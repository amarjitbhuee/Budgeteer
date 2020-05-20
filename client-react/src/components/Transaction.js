import React from "react";
import axios from "axios";
import '../transaction.min.css'; 
import { Link } from 'react-router-dom'; 

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [] };
    this.paymentType = React.createRef();
    this.date = React.createRef();
    this.type = React.createRef();
    this.amount = React.createRef();
    this.description = React.createRef();
  }
componentDidMount() {
    this.getData();
  }
 

getData = () => {
    // Express uses port 3001 (react uses 3000)
    let url = "http://localhost:3001/transactions";
    axios.get(url)
      .then(response => this.setState({ transactions: response.data }));
  };
addTransaction = () => {
    let url = "http://localhost:3001/transactions";
    axios.post(url, {
      paymentType: this.paymentType.current.value,
      date: this.date.current.value,
      type: this.type.current.value,
      amount: this.amount.current.value,
      description: this.description.current.value
    })
      .then(response => {
        // refresh the data
        this.getData();
        // empty the input
        this.paymentType.current.value = "Direct Deposit"
        this.date.current.value = ""
        this.type.current.value = "Income"
        this.amount.current.value = ""
        this.description.current.value = "";
      });
  };

//Jeff: ***Will this still be needed once we change from update to edit? 
updateTransaction = (transactionid) => {
    let url = "http://localhost:3001/transactions/" + transactionid;
    axios.put(url, {
      paymentType: this.paymentType.current.value,
      date: this.date.current.value,
      type: this.type.current.value,
      amount: this.amount.current.value,
      description: this.description.current.value
    })
      .then(response => {
        // refresh the data
        this.getData();
        // empty the input
        this.paymentType.current.value = "Direct Deposit"
        this.date.current.value = ""
        this.type.current.value = "Income"
        this.amount.current.value = ""
        this.description.current.value = "";
      });
  };
deleteTransaction = (transactionid) => {
    let url = "http://localhost:3001/transactions/" + transactionid;
    axios.delete(url)
      .then(response => this.getData())
};

render() {
    return (
      <div>
        <h3>List of Transactions (React)</h3>
        <select ref={this.paymentType} id="paymentType">
          <option value="Direct Deposit">Direct Deposit</option>
          <option value="Check">Check</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
          <option value="Other">Other</option>
        </select>
        <input ref={this.date} id="date" placeholder="Date" />
        <select ref={this.type} id="type">
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
          <option value="Savings">Savings</option>
        </select>

<input ref={this.amount} id="amount" placeholder="Amount" />
        <input ref={this.description} id="description" placeholder="Description" />
        <button type="button" className="btn btn-primary" onClick={ this.addTransaction }>add</button>
        <ul>
          {this.state.transactions.map(p => (
            <li key={p.transactionid}>
              {p.paymentType} | { p.date} | { p.type} | { p.amount} | { p.description}
              <Link to={`/history/${p.id}`}><button type="button" className="btn btn-success">Edit</button></Link>
              <button type="button" className="btn btn-danger" onClick={() => this.deleteTransaction(p.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <br />
        <Link to={`/history`}>View All Transactions</Link>
      </div>
    );
  }
}

export default Transaction;
