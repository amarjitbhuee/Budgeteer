import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { Link } from 'react-router-dom';
import '../transaction.min.css'; 
import { confirmAlert } from 'react-confirm-alert'; 

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      transactions: [],
      lastAmount: [], 
     };

    this.userid = React.createRef();
    this.paymentType = React.createRef();
    this.date = React.createRef();
    this.type = React.createRef();
    this.amount = React.createRef();
    this.description = React.createRef();
  };

  // AJ - for DatePicker => npm install react-datepicker --save
  handleChange = date => {
    this.setState({
      date: date
    });
  };

  componentDidMount() {
    this.getData();
    this.getLastAmount();
  };

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
      date: this.state.date,
      type: this.type.current.value,
      amount: this.amount.current.value,
      description: this.description.current.value
    })
      .then(response => {
        // refresh the data
        this.getData();
        // this.increment();
        window.location.reload();
        // empty the input
        this.paymentType.current.value = "Select Payment Type"
        // eslint-disable-next-line
        this.state.date = ""
        this.type.current.value = "Select Type"
        this.amount.current.value = ""
        this.description.current.value = "";

      });
    };
   
    getLastAmount = () => {
      // Express uses port 3001 (react uses 3000)
      let url = "http://localhost:3001/transactions/lastAmount";
      axios.get(url)
        .then(response => this.setState({ lastAmount: response.data }))
      };
   
    delete = (transactionid) => {
      confirmAlert ({
        title: "ARE YOU SURE?", 
        message: "You Are About To Delete A Transaction!", 
        buttons: [
          {
            label: "I Am Sure!", 
            onClick: () => 
              this.deleteTransaction(transactionid),
          },
          {
            label: "Cancel"
          }
        ]
      });
    };
    
    deleteTransaction = (transactionid) => {
      let url = "http://localhost:3001/transactions/" + transactionid;
      axios.delete(url)
        .then(response => {
          this.getData();
          alert('Your Transaction has been deleted!');
          window.location.reload();
        })
    };

render() {

    return (
      <div>
        <h3 className="quote">"Beware of little expenses. A small leak will sink a great ship." ~Benjamin Franklin</h3>
        <p className="transactions">Add A New Transaction Transaction</p>
        <h5 className="adjustment">Your Balance Has Been Modified By: <span className="adjustedBalance">${ this.state.lastAmount.amount }</span></h5>
        <form className="form">
          <select ref={this.paymentType} id="paymentType">
            <option value="Select Payment Type">Select Payment Type</option>
            <option value="null">-------------</option>
            <option value="Direct Deposit">Direct Deposit</option>
            <option value="Check">Check</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Other">Other</option>
          </select>
          <DatePicker selected={this.state.date} onChange={this.handleChange} placeholderText="Date" />
          <select ref={this.type} id="type">
            <option value="Select Type">Select Type</option>
            <option value="null">-------------</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
            <option value="Savings">Savings</option>
          </select>
          <input ref={this.amount} id="amount" placeholder="$ Dollar Amount" type="number" onChange={event => this.setState({ addAmount: event.target.value})} />
          <input ref={this.description} id="description" placeholder="Description" />
          <button type="button" className="btn btn-primary" onClick={this.addTransaction}>add</button>
        </form>
        <ul>
          {this.state.transactions.map(p => (
            <li key={p.transactionid}>
              {p.paymentType} | { p.date} | { p.type} | { p.amount} | { p.description}
              <Link to={`/edit/${p.transactionid}`}><button type="button" className="btn btn-success">Edit</button></Link>
              <button type="button" className="btn btn-danger" onClick={() => this.delete(p.transactionid)}>Delete</button>
            </li>
          ))}
        </ul>
        <Link to={`/history`}><p className="allTransactions">View All Transactions</p></Link>
      </div>
    );
  }
}

export default Transaction;
