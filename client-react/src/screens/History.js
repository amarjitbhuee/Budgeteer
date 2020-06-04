import React from 'react';
//Jeff: added import axios from "axios"
import axios from "axios";
import '../transaction.min.css';
//Jeff: added link from react-router-dom
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

//Jeff: added History component to be rendered
class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [] };
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    let url = "http://localhost:3001/transactions/history";
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
        this.getData();
        alert('Your Transaction has been deleted!');
      })
  };
  render() {
    return (
      <div className="form">
        <h1 className="transactions">Transaction History</h1>
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
              <td><button type="button" className="btn btn-danger" onClick={() => this.delete(p.transactionid)}>Delete</button></td>
            </tr>
          ))}
          </tbody>
        </table>
        <br />
        <Link to={`/`} className="allTransactions">Home</Link><br />
      </div>
    );
  }
}

export default History; 