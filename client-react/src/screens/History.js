import React from 'react';
import axios from "axios";
import '../transaction.min.css';
import Links from '../components/nav/Links';
import AllHistoryTransactions from '../components/transactionHistory/AllHistoryTransactions';


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

  render() {
    return (
      <div className="form">
        <h1 className="transactions">Transaction History</h1>
        <AllHistoryTransactions />
        <Links />
      </div>
    );
  }
}

export default History; 