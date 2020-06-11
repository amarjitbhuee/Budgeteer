import React from "react";
import '../transaction.min.css';
import axios from "axios";
import DatePicker from "react-datepicker";
import Links from "../components/nav/Links";

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

  handleChange = date => {
    this.setState({
      date: date
    });
  };

  componentDidMount() {
    this.getTransaction();
  };

  getTransaction = () => {
    let id = this.props.match.params.transactionid;
    let url = "http://localhost:3001/transactions/edit/" + id;
    axios.get(url)
      .then(response => this.setState({ transactions: response.data }))
  };
 
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
        window.location.reload();
        // refresh the data
        this.getTransaction();
      })
      .catch(err => console.log(err));
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
        <h3 className="transactions">Update Transaction</h3>
        <form className="form">
          <table className="table">
            <thead>
            <tr>
              <th></th>
              <th>Edit Payment Type:</th>
              <th>Edit Date:</th>
              <th>Edit Payment Type:</th>
              <th>Edit Amount:</th>
              <th>Edit Description:</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Entered</td>
              <td>{this.state.transactions.paymentType}</td>
              <td>{this.state.transactions.date} </td>
              <td>{this.state.transactions.type}</td>
              <td>${this.state.transactions.amount}</td>
              <td>{this.state.transactions.description}</td>
            </tr>
            </tbody>
            <tbody>
            <tr>
              <td>Edit</td>
              <td><select ref={this.paymentType} className="selectFields2">
                  <option value={this.state.transactions.paymentType} className="type">{this.state.transactions.paymentType} </option>
                  <option value="Direct Deposit">Direct Deposit</option>
                  <option value="Check">Check</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                  <option value="Other">Other</option>
              </select></td>
              <td><DatePicker selected={this.state.date} onChange={this.handleChange} placeholderText={this.state.transactions.date} /></td>
              <td><select ref={this.type} className="selectFields2">
    <option value={this.state.transactions.type} className="type">{this.state.transactions.type}</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                  <option value="Savings">Savings</option>
              </select></td>
              <td><input ref={this.amount} className="amount" defaultValue={this.state.transactions.amount} /></td>
              <td><input ref={this.description} className="description" defaultValue={this.state.transactions.description} required /></td>
              <td><button type="button" className="btn btn-success" onClick={() => this.updateTransaction(this.transactionid)}>Update</button></td>
            </tr>
            </tbody>
          </table>
        </form>
        <p className="note">*** Please make ensure that all fields are filled out prior to update ***<br />- Team Penguin</p>
        <Links />
      </div>
    );
  }
}

export default Edit;
