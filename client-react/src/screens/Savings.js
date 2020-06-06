import React from 'react';
//Jeff: added import axios from "axios"
import axios from "axios";
import '../transaction.min.css';
//Jeff: added link from react-router-dom
import { Link } from 'react-router-dom';
import Links from '../components/Links';


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
  deleteTransaction = (transactionid) => {
    let url = "http://localhost:3001/transactions/" + transactionid;
    axios.delete(url)
      .then(response => {
        this.getSavings();
        alert('Your Transaction has been deleted!');
        window.location.reload();
      })
  };

  render() {
    return (
      <div className="form">
        <h1 className="transactions">Your Savings History</h1>
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
        <Links />
      </div>
    );
  }
}

export default Savings; 