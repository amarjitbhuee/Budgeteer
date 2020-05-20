import React from "react";
import axios from "axios";
import '../transaction.min.css'; 
//import { Link } from 'react-router-dom'; 

class UpdateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [] };
  }
  //Jeff renamed to getTransaction to try to get transaction based on its id
componentDidMount() {
    this.getTransaction();
  }
  getTransaction = () => {
      let url = "http://localhost:3001/transactions"; 
      axios.get(url).then(response => this.setState({ transactions: response.data}));
  }

render() {
    return (
      <div>
        <h1>Update Transaction</h1>
        {this.state.transactions.map(p => (
            <div>
            {p.paymentType} | { p.date} | { p.type} | { p.amount} | { p.description}
            </div>
        ))}
      </div>
    );
  }
}

export default UpdateItem;
