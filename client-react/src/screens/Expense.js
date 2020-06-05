import React from 'react';
//Jeff: added import axios from "axios"
import axios from "axios";
import '../transaction.min.css';
//Jeff: added link from react-router-dom
import { Link } from 'react-router-dom';


//Jeff: added History component to be rendered
class Expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [] };
  }
  componentDidMount() {
    this.getExpense();
  }
  getExpense = () => {
    let url = "http://localhost:3001/transactions/expenseShow";
    axios.get(url)
      .then(response => this.setState({ transactions: response.data }));
  };
  deleteTransaction = (transactionid) => {
    let url = "http://localhost:3001/transactions/" + transactionid;
    axios.delete(url)
      .then(response => {
        this.getExpense();
        alert('Your Transaction has been deleted!');
        window.location.reload();
      })
  };

  render() {
    return (
      <div className="form">
        <h1 className="transactions">Your Expense History</h1>
        <table className="table">
          <tbody>
            <tr className="rowHead">
              <th>Payment Type</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
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
            ))}
          </tbody>
        </table>
        <br />
        <Link to={`/`} className="allTransactions">Home</Link><br /><br />
        <Link to={`/history`} className="allTransactions">View All Transactions</Link><br /><br />
        <p className="note2">If you received an N/A or if any column is blank in any of your transactions you can simply edit them</p>
        <p><Link to={'/help'}><span className="help">Help & More Information</span></Link></p>
      </div>
    );
  }
}

export default Expense; 