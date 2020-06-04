import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import '../transaction.min.css';

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
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
      <div className="form">
        <p className="transactions">Add A New Transaction</p>
        <h3 className="quote">"Beware of little expenses. A small leak will sink a great ship." ~Benjamin Franklin</h3>
        <form className="form">
          <table className="table">
            <tbody>
              <tr>
                <td><select ref={this.paymentType} id="paymentType">
                  <option value="Select Payment Type">Select Payment Type</option>
                  <option value="null">-------------</option>
                  <option value="Direct Deposit">Direct Deposit</option>
                  <option value="Check">Check</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                  <option value="Other">Other</option>
                </select></td>
                <td><DatePicker selected={this.state.date} onChange={this.handleChange} placeholderText="Date" /></td>
                <td><select ref={this.type} id="type">
                  <option value="Select Type">Select Type</option>
                  <option value="null">-------------</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                  <option value="Savings">Savings</option>
                </select></td>
                <td><input ref={this.amount} id="amount" placeholder="$ Dollar Amount" type="number" /></td>
                <td><input ref={this.description} id="description" placeholder="Description" /></td>
              </tr>
            </tbody>
          </table>
          <button type="button" className="addTransaction" onClick={this.addTransaction}>add</button>

        </form>
        <table className="table">
          <thead>
            <tr className="rowHead">
              <th>Payment Type</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
              <th></th>
              <th></th>
            </tr></thead>
          <tbody>
            {this.state.transactions.map(p => (
              <tr key={p.transactionid}>
                <td>{p.paymentType}</td>
                <td>{p.date}</td>
                <td>{p.type}</td>
                <td>${p.amount}</td>
                <td>{p.description}</td>
                <td><Link to={`/edit/${p.transactionid}`}><button type="button" className="btn btn-success">Edit</button></Link></td>
                <td><button type="button" className="btn btn-danger" onClick={() => this.deleteTransaction(p.transactionid)}>Delete</button></td>
              </tr>
            ))}</tbody>
        </table>
        <Link to={`/history`}><p className="allTransactions">View All Transactions</p></Link>
      </div>
    );
  }
}

export default Transaction;
