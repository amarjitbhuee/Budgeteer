import React from 'react';
//Jeff: added import axios from "axios"
import axios from "axios";
import '../transaction.min.css';
//Jeff: added link from react-router-dom
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 

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
    delete = (transactionid) => {
        confirmAlert ({
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
          this.getExpense();
          alert('Your Transaction has been deleted!');
        })
    };
    render() {
        return (
            <div>
                <h1 className="transactions">Your Expense History</h1>
                <ul>
                    {this.state.transactions.map(p => (
                        <li key={p.transactionid}>
                            {p.paymentType} | { p.date} | { p.type} | { p.amount} | { p.description}
                            <Link to={`/edit/${p.transactionid}`}><button type="button" className="btn btn-success">Edit</button></Link>
                            <button type="button" className="btn btn-danger" onClick={() => this.delete(p.transactionid)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <br />
                <Link to={`/`}>Home</Link><br />
            </div>
        );
    }
}

export default Expense; 