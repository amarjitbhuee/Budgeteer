import React from "react";
import '../transaction.min.css';
import axios from "axios";
import DatePicker from "react-datepicker";

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
        alert('Hey there Budgeteer!\n\nYou Applied An Update To Your Transaction!')
        window.location.reload();
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
            <thead>
            <tr className="editFields">
              <th></th>
              <th className="editTitle">Edit Payment Type:</th>
              <th className="editTitle">Edit Date:</th>
              <th className="editTitle">Edit Payment Type:</th>
              <th className="editTitle">Edit Amount:</th>
              <th className="editTitle">Edit Description:</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Entered: </td>
              <td className="editField">{this.state.transactions.paymentType}</td>
              <td className="editField">{this.state.transactions.date} </td>
              <td className="editField">{this.state.transactions.type}</td>
              <td className="editField">${this.state.transactions.amount}</td>
              <td className="editField">{this.state.transactions.description}</td>
            </tr>
            </tbody>
            <tbody>
            <tr>
              <td>Edit: </td>
              <td><select ref={this.paymentType} className="selectFields2" name="paymentType">
                  <option value={this.state.transactions.paymentType}>{this.state.transactions.paymentType}</option>
                  <optgroup label="Select Payment Type:">
                    <option value="Direct Deposit">Direct Deposit</option>
                    <option value="Check">Check</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Other">Other</option>
                  </optgroup>
              </select></td>
              <td><DatePicker selected={this.state.date} onChange={this.handleChange} placeholderText={this.state.transactions.date} /></td>
              <td><select ref={this.type} className="selectFields2" defaultValue={this.state.transactions.Type} name="type">
                  <option value={this.state.transactions.type}>{this.state.transactions.type}</option>
                  <optgroup label="Transaction Type: ">
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                    <option value="Savings">Savings</option>
                  </optgroup>
              </select></td>
              <td><input ref={this.amount} className="amount" defaultValue={this.state.transactions.amount} /></td>
              <td><input ref={this.description} className="description" defaultValue={this.state.transactions.description} required /></td>
            </tr>
            </tbody>
          </table>
          <button type="button" className="update" onClick={() => this.updateTransaction(this.transactionid)}>Update</button>
        </form>
        <p className="note">*** Please make ensure that all fields are filled out prior to update ***<br />- Team Penguin</p>
      </div>
    );
  }
}

export default Edit;
