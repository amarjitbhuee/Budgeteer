import React from 'react';
//Jeff: added import axios from "axios"
import axios from "axios";
import '../transaction.min.css';
//Jeff: added link from react-router-dom
import { Link } from 'react-router-dom';


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
    deleteTransaction = (transactionid) => {
        let url = "http://localhost:3001/transactions/" + transactionid;
        axios.delete(url)
            .then(response => this.getData())
    }

    render() {
        return (
            <div>
                <h1>Transaction History</h1>
                <ul>
                    {this.state.transactions.map(p => (
                        <li key={p.transactionid}>
                            {p.paymentType} | { p.date} | { p.type} | { p.amount} | { p.description}
                            <Link to={`/edit/${p.transactionid}`}><button type="button" className="btn btn-success">Edit</button></Link>
                            <button type="button" className="btn btn-danger" onClick={() => this.deleteTransaction(p.transactionid)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <br />
                <Link to={`/`}>Home</Link><br />
            </div>
        );
    }
}

export default History; 