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
    let id = this.props.match.params.transactionid;
    let url = "http://localhost:3001/transactions/edit/" + id;
    axios.get(url)
      .then(response => this.setState({ transactions: response.data }))
  };


  //Jeff: ***Will this still be needed once we change from update to edit?
  //Jeff: ***May have to to move to edit screen 
  //Jeff: Moved from transaction.js  
  updateTransaction = () => {
    let id = this.props.match.params.transactionid
    let url = "http://localhost:3001/transactions/edit/" + id;
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
      <div className="form">
        <h3 className="transactions">Update Transaction</h3>
        <form className="form">
          <table className="table">
            <tr>
              <th></th>
              <th>Edit Payment Type:</th>
              <th>Edit Date:</th>
              <th>Edit Payment Type:</th>
              <th>Edit Amount:</th>
              <th>Edit Description:</th>
            </tr>
            <tr>
              <td>Entered</td>
              <td>{this.state.transactions.paymentType}</td>
              <td>{this.state.transactions.date} </td>
              <td>{this.state.transactions.type}</td>
              <td>${this.state.transactions.amount}</td>
              <td>{this.state.transactions.description}</td>
            </tr>
            <tr>
              <td>Edit</td>
              <td><select ref={this.paymentType} className="paymentType" defaultValue={this.state.transactions.paymentType}>
                <optgroup label="Payment Type:">
                  <option value={this.state.transactions.paymenttype} defaultValue>{this.state.transactions.paymentType}</option>
                  <option value="null">-------------</option>
                  <option value="Direct Deposit">Direct Deposit</option>
                  <option value="Check">Check</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                  <option value="Other">Other</option>
                </optgroup>
              </select></td>
              <td><DatePicker selected={this.state.date} onChange={this.handleChange} placeholderText={this.state.transactions.date} /></td>
              <td><select ref={this.type} className="type">
                <optgroup label="Type:">
                  <option value={this.state.transactions.type} defaultValue>{this.state.transactions.type}</option>
                  <option value="null">-------------</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                  <option value="Savings">Savings</option>
                </optgroup>
              </select></td>
              <td><input ref={this.amount} className="amount" defaultValue={this.state.transactions.amount} /></td>
              <td><input ref={this.description} className="description" defaultValue={this.state.transactions.description} /></td>
              <td><button type="button" className="btn btn-success" onClick={() => this.updateTransaction(this.transactionid)}>Update</button></td>
            </tr>
          </table>
        </form>
        <br />
        <Link to={`/`} className="allTransactions">Home</Link><br />
        <br />
        <Link to={`/history`} className="allTransactions">View All Transactions</Link>
      </div>
    );
  }
}

export default Edit;
