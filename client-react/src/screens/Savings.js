import React from 'react';
//Jeff: added import axios from "axios"
import axios from "axios";
import '../transaction.min.css';
//Jeff: added link from react-router-dom
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

//Jeff: added History component to be rendered
class Savings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [] };
  }
  componentDidMount() {
    this.getSavings();
  }

  getSavings = () => {
    let url = "http://localhost:3001/transactions/savingsShow";
    axios.get(url)
      .then(response => this.setState({ transactions: response.data }));
  };
  delete = (transactionid) => {
    confirmAlert({
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
  }

  deleteTransaction = (transactionid) => {
    let url = "http://localhost:3001/transactions/" + transactionid;
    axios.delete(url)
      .then(response => {
        this.getSavings();
        alert('Your Transaction has been deleted!');
      })
  };
  render() {
    return (
      <div className="form">
        <h1 className="transactions">Your Savings History</h1>
        <table className="table">
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
              <td><button type="button" className="btn btn-danger" onClick={() => this.delete(p.transactionid)}>Delete</button></td>
            </tr>
          ))}
        </table>
        <br />
        <Link to={`/`} className="allTransactions">Home</Link><br />
      </div>
    );
  }
}

export default Savings; 