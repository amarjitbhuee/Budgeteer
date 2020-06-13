import React from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import '../../transaction.min.css';
import { Link } from 'react-router-dom';

class ExpenseTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  };

  componentDidMount() {
    this.getExpense();
  };

  getExpense = () => {
    let url = "http://localhost:3001/transactions/expenseShow";
    axios.get(url)
      .then(response => this.setState({ transactions: response.data }));
  };

  confirmDelete = (transactionid) => {
    if (window.confirm('Hey There Budgeteer!\n\nAre you sure you want to delete this transaction?')) {
      this.deleteTransaction(transactionid);
    }
    else {
      alert('Your transactions was NOT deleted!')
    }
  }
  
  deleteTransaction = (transactionid) => {
    let url = "http://localhost:3001/transactions/" + transactionid;
    axios.delete(url)
      .then(response => {
        this.getExpense();
        alert('Your transction has been DELETED!')
        window.location.reload();
      })
  };

    render() {
        return (
            <div>
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
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.transactions.map(p => (
                            <tr key={p.transactionid}>
                                <td>{p.paymentType}</td>
                                <td>{p.date}</td>
                                <td>{p.type}</td>
                                <td>${p.amount}</td>
                                <td>{p.description}</td>
                                <td><Link to={`/edit/${p.transactionid}`}><button type="button" className="btn btn-success">Edit</button></Link></td>
                                <td><button type="button" className="btn btn-danger" onClick={() => this.confirmDelete(p.transactionid)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ExpenseTransactions; 