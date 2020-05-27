import React from "react";
import '../transaction.min.css'; 
import axios from "axios";
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom';

class Edit extends React.Component {
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
  }

  //Jeff copied from transaction.js
  handleChange = date => {
    this.setState({
      date: date
    });
  };

  //Jeff renamed to getTransaction to try to get transaction based on its id
  componentDidMount() {
    this.getTransaction();
  }; 

  getTransaction = () => {
    //Jeff: Url connects properly without out manually inputing the transaction id
    let className = this.props.match.params.transactionid;
    let url = "http://localhost:3001/transactions/edit/" + className; 
    axios.get(url)
    .then(response => this.setState({ transactions: response.data }))
 };

  //Jeff: Moved from transaction.js  
  updateTransaction = () => {
    let className = this.props.match.params.transactionid
    let url = "http://localhost:3001/transactions/edit/" + className;
    axios.put(url, {
      paymentType: this.paymentType.current.value,
      date: this.state.date,
      type: this.type.current.value,
      amount: this.amount.current.value,
      description: this.description.current.value
    })
      .then(response => {
        // refresh the data
        this.getTransaction();
      })
      .catch(err => console.log(err));
  };

render() {
    return (
      <div>
        <h3>Update Transaction</h3>
        <p>Payment Type: {this.state.transactions.paymentType}</p>
        <p>Date: {this.state.transactions.date} </p>
        <p>Type: {this.state.transactions.type}</p>
        <p>Amount: ${this.state.transactions.amount}</p>
        <p>Description: {this.state.transactions.description}</p>
        <select ref={this.paymentType} className="paymentType" defaultValue={this.state.transactions.paymentType}>
          <option value={this.state.transactions.paymenttype} defaultValue>{this.state.transactions.paymentType}</option>
          <option value="null">-------------</option>
          <option value="Direct Deposit">Direct Deposit</option>
          <option value="Check">Check</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
          <option value="Other">Other</option>
        </select>
        <DatePicker selected={this.state.date} onChange={this.handleChange} placeholderText={this.state.transactions.date} />
        <select ref={this.type} className="type">
          <option value={this.state.transactions.type} defaultValue>{this.state.transactions.type}</option>
          <option value="null">-------------</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
          <option value="Savings">Savings</option>
        </select>
    <input ref={this.amount} className="amount" defaultValue={this.state.transactions.amount} />
        <input ref={this.description} id="description" defaultValue={this.state.transactions.description} />
        <button type="button" className="btn btn-success" onClick={() => this.updateTransaction(this.transactionid)}>Update</button>
        <br />
        <Link to={`/`}>Home</Link><br />
        <br />
        <Link to={`/history`}>View All Transactions</Link>
      </div>
    );
  }
}

export default Edit;
