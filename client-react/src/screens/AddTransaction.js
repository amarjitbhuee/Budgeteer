import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../transaction.min.css';
import NewTransaction from '../components/NewTransaction';
import RecentTransactions from '../components/transactionHistory/RecentTransactions';


class AddTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };

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
    //window.location.reload();
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
      })
      .catch((error) => alert('Oops! . There Is A Problem'))
      window.location.reload();
  };

  render() {
    return (
      <div className="form">
        <NewTransaction />
        <form className="form">
          <table className="table">
            <tbody>
              <tr>
                <td><select required ref={this.paymentType} className="selectFields" defaultValue="N/A" name="paymentType">
                  <option value="N/A" disabled className="type">Select Payment Type: </option>
                  <option value="Direct Deposit">Direct Deposit</option>
                  <option value="Check">Check</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                  <option value="Other">Other</option>
                </select></td>
                <td><DatePicker selected={this.state.date} onChange={this.handleChange} placeholderText="Date" /></td>
                <td><select ref={this.type} className="selectFields" defaultValue="N/A (Amount Was Not Added)" name="type">
                  <option value="N/A (Amount Was Not Added)" disabled className="type">Transaction Type: </option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                  <option value="Savings">Savings</option>
                </select></td>
                <td>
                <input ref={this.amount} className="amount" placeholder="$ Dollar Amount" type="number"  /></td>
                <td><input ref={this.description} className="description" placeholder="Description"/></td>
              </tr>
            </tbody>
          </table>
          <button type="button" className="addTransaction" onClick={this.addTransaction}>add</button>
          <p className="note">*** Thank you for choosing Budgeteer! Please note that this application is based on whole numbers and all demcimals will be rounded to the nearest dollar. - Team Penguin***</p>
        </form>
        <h4>Recent Transactions</h4>
        <RecentTransactions />
      </div>
    );
  }
}

export default AddTransaction;
