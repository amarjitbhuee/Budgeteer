import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { Link } from 'react-router-dom';
import '../transaction.min.css'; 

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [] };
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
      userid: this.userid.current.value,
      paymentType: this.paymentType.current.value,
      date: this.state.date,
      type: this.type.current.value,
      amount: this.amount.current.value,
      description: this.description.current.value
    })
      .then(response => {
        // refresh the data
        this.getData();
        // empty the input
        this.paymentType.current.value = "Direct Deposit"
        // eslint-disable-next-line
        this.state.date = ""
        this.type.current.value = "Income"
        this.amount.current.value = ""
        this.description.current.value = "";
        this.userid.current.value = "";
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
        <input ref={this.userid} id="userid" placeholder="user id" />
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
        <input ref={this.amount} id="amount" placeholder="$ Dollar Amount" />
        <input ref={this.description} id="description" placeholder="Description" />
        <button type="button" className="btn btn-primary" onClick={this.addTransaction}>add</button>
        <ul>
          {this.state.transactions.map(p => (
            <li key={p.transactionid}>
              {p.paymentType} | { p.date} | { p.type} | { p.amount} | { p.description}
              <Link to={`/edit/${p.transactionid}`}><button type="button" className="btn btn-success">Edit</button></Link>
              <button type="button" className="btn btn-danger" onClick={() => this.deleteTransaction(p.transactionid)}>Delete</button>
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
